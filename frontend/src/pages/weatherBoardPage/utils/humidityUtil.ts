export function getHumidityPath(value: number): string {
  const cx = 148.492;
  const cy = 148.492;
  const innerR = 84; // 배경 고리의 안쪽 반지름
  const outerR = 105; // 배경 고리의 바깥 반지름
  const r = (innerR + outerR) / 2;

  const startDeg = 135;
  const spanDeg = 270;

  const v = Math.max(0, Math.min(100, value));
  const endDeg = startDeg + (spanDeg * v) / 100;

  const toXY = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const s = toXY(startDeg);
  const e = toXY(endDeg);
  const sweep = 1; // 시계방향
  const largeArc = (spanDeg * v) / 100 > 180 ? 1 : 0;

  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} ${sweep} ${e.x} ${e.y}`;
}
