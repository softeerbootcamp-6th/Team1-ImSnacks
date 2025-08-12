import { useEffect, useState } from 'react';
import { css } from '@emotion/react';

export const useDustAnimation = (value: number, maxValue: number) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 42.5;

  // progress에 따른 stroke-dashoffset 계산
  const progress = Math.min(value / maxValue, 1);
  const offset = circumference * (1 - progress);

  // 애니메이션 스타일 생성
  const animationStyle = css`
    stroke-dasharray: ${circumference};
    stroke-dashoffset: ${isAnimated ? offset : circumference};
    transition: stroke-dashoffset 2s ease-out;
  `;

  return {
    isAnimated,
    progress,
    offset,
    circumference,
    animationStyle,
  };
};
