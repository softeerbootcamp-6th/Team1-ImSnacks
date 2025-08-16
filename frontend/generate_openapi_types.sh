#!/usr/bin/env bash
set -euo pipefail

# 1) .env 로드
if [ -f .env ]; then
  export $(grep -v '^[[:space:]]*#' .env | xargs)
fi

# === 설정 ===
SPEC_URL="${VITE_API_URL}/v3/api-docs"
OUT_DIR="./src/types/openapiGenerator"
GENERATOR="typescript"

# 파일/바이너리 타입을 Blob으로 강제 매핑
TYPE_MAPPINGS="string+binary=Blob,file=Blob,HttpFile=Blob"

# 모델만 생성 (apis, runtime, docs, tests 전부 off)
GLOBAL_PROPS="models,modelDocs=false,apis=,supportingFiles=,apiDocs=false,apiTests=false,modelTests=false"

# 2) 임시 디렉터리
TMP_DIR="$(mktemp -d 2>/dev/null || mktemp -d -t 'oapi_types')"
trap 'rm -rf "$TMP_DIR"' EXIT

# 3) 임시 폴더에 생성
openapi-generator-cli generate \
  -i "$SPEC_URL" \
  -g "$GENERATOR" \
  -o "$TMP_DIR" \
  --skip-validate-spec \
  --type-mappings "$TYPE_MAPPINGS" \
  --global-property "$GLOBAL_PROPS"

# 4) 목적지 준비
mkdir -p "$OUT_DIR/models"

# 5) models만 동기화
if [ -d "$TMP_DIR/models" ]; then
  rsync -a --checksum "$TMP_DIR/models/" "$OUT_DIR/models/"
else
  find "$TMP_DIR" -maxdepth 1 -type f -name "*.ts" \
    ! -name "runtime.ts" ! -name "index.ts" \
    -exec rsync -a --checksum {} "$OUT_DIR/models/" \;
fi

# 6) (중요) ObjectSerializer.ts 제거
find "$OUT_DIR/models" -maxdepth 1 -type f -name "ObjectSerializer.ts" -delete || true

# 7) sed 헬퍼 (macOS/GNU 호환)
_sed_inplace() {
  if sed --version >/dev/null 2>&1; then
    sed -i -E "$@"
  else
    sed -i '' -E "$@"
  fi
}

# 8) HttpFile import 제거 + 심볼을 Blob으로 치환 (이전 A안 유지)
fix_httpfile_in_model() {
  f="$1"
  _sed_inplace '/^import[[:space:]]*{[^}]*HttpFile[^}]*}[[:space:]]*from[[:space:]]*["'\'']\.\.\/http\/http["'\''].*$/d' "$f"
  _sed_inplace '/^import[[:space:]]*HttpFile[[:space:]]*from[[:space:]]*["'\'']\.\.\/http\/http["'\''].*$/d' "$f"
  _sed_inplace '/^import[[:space:]]*\*[[:space:]]*as[[:space:]]*HttpFile[[:space:]]*from[[:space:]]*["'\'']\.\.\/http\/http["'\''].*$/d' "$f"
  _sed_inplace 's/\bHttpFile\b/Blob/g' "$f"
  _sed_inplace 's/import[[:space:]]*{[[:space:]]*,[[:space:]]*/import { /g' "$f"
  _sed_inplace 's/,[[:space:]]*}/ }/g' "$f"
}

export -f fix_httpfile_in_model _sed_inplace
find "$OUT_DIR/models" -type f -name '*.ts' -exec bash -lc 'fix_httpfile_in_model "$0"' {} \;

# 9) (핵심) export enum → const 객체 + union 타입으로 변환
#   TS1294(erasableSyntaxOnly/isolatedDeclarations) 대응
node - <<'NODE'
const fs = require('fs');
const path = require('path');

const MODELS_DIR = process.env.MODELS_DIR || path.resolve(process.cwd(), process.argv[2] || './src/types/openapiGenerator/models');

const enumToConst = (code) => {
  // 멀티라인 enum 매칭
  // export enum Name { A = 'A', B = "B", C = 1, ... }
  const enumRegex = /export\s+enum\s+([A-Za-z0-9_]+)\s*\{([\s\S]*?)\}/g;

  return code.replace(enumRegex, (_, name, body) => {
    // enum 멤버 파싱 (키 = 값 혹은 키만)
    // 라인/쉼표 기준으로 멤버 분리
    const raw = body
      .split(/,(?![^\(\)]*\))/) // 일반적인 콤마 분리
      .map(s => s.trim())
      .filter(Boolean);

    const entries = [];
    for (const line of raw) {
      // 예: KEY = 'VAL'  | KEY = "VAL" | KEY = 1 | KEY
      const m = line.match(/^([A-Za-z0-9_]+)(\s*=\s*(.+))?$/);
      if (!m) continue;
      const key = m[1];
      let val = m[3];
      if (val == null) {
        // 값이 없으면, 문자열 키를 그대로 값으로 쓰는 패턴(유틸리티 import 최소화)
        val = `'${key}'`;
      } else {
        val = val.trim().replace(/;$/, '');
        // 숫자/문자열 이외인 경우는 문자열로 강제(드물지만 안전빵)
        if (!/^(['"]).*\1$/.test(val) && !/^[0-9]+$/.test(val)) {
          val = `'${val.replace(/['"]/g, '')}'`;
        }
      }
      entries.push(`  ${key}: ${val}`);
    }

    const constObj =
`export const ${name} = {
${entries.join(',\n')}
} as const;
export type ${name} = typeof ${name}[keyof typeof ${name}];`;

    return constObj;
  });
};

function processFile(file) {
  const code = fs.readFileSync(file, 'utf8');
  const next = enumToConst(code);
  if (next !== code) {
    fs.writeFileSync(file, next, 'utf8');
  }
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.isFile() && p.endsWith('.ts')) processFile(p);
  }
}

walk(MODELS_DIR);
NODE

# 10) 최상위 정리: models/와 index.ts만 남기기
find "$OUT_DIR" -mindepth 1 -maxdepth 1 -type d ! -name "models" -exec rm -rf {} +
find "$OUT_DIR" -mindepth 1 -maxdepth 1 -type f ! -name "index.ts" -exec rm -f {} + || true

# 10-1) models/index.ts 파일 삭제 (생성되지 않도록)
rm -f "$OUT_DIR/models/index.ts" || true

# 10-2) models/all.ts 파일 생성 (모든 모델을 export)
cat > "$OUT_DIR/models/all.ts" <<'EOF'
// Auto-generated file - do not edit
EOF

# models 폴더의 모든 .ts 파일을 all.ts에 export 추가 (index.ts와 all.ts 제외)
find "$OUT_DIR/models" -name "*.ts" ! -name "index.ts" ! -name "all.ts" | sort | while read -r file; do
  basename_no_ext=$(basename "$file" .ts)
  echo "export * from './$basename_no_ext';" >> "$OUT_DIR/models/all.ts"
done

# 11) 배럴 파일(index.ts) 생성 - models/all로 변경
cat > "$OUT_DIR/index.ts" <<'EOF'
export * from './models/all';
EOF

echo "✅ OpenAPI 타입만 생성 + ObjectSerializer 제거 + enum 변환 완료: $OUT_DIR"
