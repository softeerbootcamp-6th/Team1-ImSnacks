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

/**
 * 값 변경 시 애니메이션을 재시작하는 훅
 * @param value 감시할 값
 * @param maxValue 최대값
 * @returns 애니메이션 관련 상태와 스타일
 */
export const useDustAnimationWithReset = (value: number, maxValue: number) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // 값이 변경될 때마다 애니메이션 재시작
  useEffect(() => {
    setIsAnimated(false);
    setAnimationKey(prev => prev + 1);

    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const circumference = 2 * Math.PI * 42.5;
  const progress = Math.min(value / maxValue, 1);
  const offset = circumference * (1 - progress);

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
    animationKey, // 애니메이션 재시작을 위한 키
  };
};
