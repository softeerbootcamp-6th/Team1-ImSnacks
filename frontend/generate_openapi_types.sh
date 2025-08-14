#!/bin/sh

# .env 파일에서 환경변수 로드
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

openapi-generator-cli generate -i "${VITE_API_URL}/v3/api-docs" -g typescript-fetch -o ./src/types/openapiGenerator --skip-validate-spec
if [ $? -ne 0 ]; then
  echo 'OpenAPI 타입 생성에 실패했습니다.'
  exit
fi

echo 'OpenAPI 타입 생성에 성공했습니다.'
exit