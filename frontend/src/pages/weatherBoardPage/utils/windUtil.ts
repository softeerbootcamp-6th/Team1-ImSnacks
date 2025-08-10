export const getArrowPosition = (deg: number) => {
  // degree를 0-360 범위로 정규화
  const normalizedDeg = ((deg % 360) + 360) % 360;

  // 삼각함수를 사용하여 translate 값 계산
  const radian = (normalizedDeg * Math.PI) / 180;

  const x = Math.sin(radian) * -50; // sin으로 x 계산 (음수를 곱해서 방향 반전)
  const y = (Math.cos(radian) - 1) * 50; // cos으로 y 계산, -1하여 0~-100 범위

  return {
    transform: `translate(${x}%, ${y}%) rotate(${deg}deg)`,
  };
};
