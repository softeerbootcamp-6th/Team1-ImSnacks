import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  easeOutCubic,
  getSunPositionNow,
} from '@/pages/weatherBoardPage/utils/sunsetUtil';

export const useSunsetAnimation = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const radius = 121;
  const durationMs = 4000;

  // 접근성: 모션 최소화
  const prefersReduced = useMemo(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window))
      return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // 목표 sunPosition을 현재 시각 기준으로 산출
  const rawSunPosition = useMemo(
    () => getSunPositionNow(startTime, endTime),
    [startTime, endTime]
  );

  const targetSunPosition = useMemo(
    () => Math.max(0, Math.min(100, rawSunPosition)),
    [rawSunPosition]
  );

  // 애니메이션 진행도(0 → targetSunPosition)
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced || durationMs <= 0) {
      setProgress(targetSunPosition);
      return;
    }
    startRef.current = null;
    cancelAnimationFrame(rafRef.current ?? 0);

    const from = 0; // 항상 0에서 시작해 채워지도록
    const to = targetSunPosition;

    const tick = (ts: number) => {
      if (startRef.current == null) startRef.current = ts;
      const t = Math.min(1, (ts - startRef.current) / durationMs);
      setProgress(from + (to - from) * easeOutCubic(t));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current ?? 0);
  }, [targetSunPosition, prefersReduced, durationMs]);

  // 진행도 기반 좌표/경로
  const angle = (progress / 100) * Math.PI;
  const sunX = -radius * Math.cos(angle);
  const sunY = -radius * Math.sin(angle);
  const largeArcFlag = progress > 50 ? 1 : 0;

  // 태양 아이콘 표시 여부 (일출/일몰 시간 범위 내에서만 표시)
  const shouldShowSun = rawSunPosition >= 0 && rawSunPosition <= 100;

  const semicirclePath = `M -${radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0 L -${radius} 0 Z`;
  const sectorPath =
    progress <= 0
      ? ''
      : `M 0 0 L -${radius} 0 A ${radius} ${radius} 0 ${largeArcFlag} 1 ${sunX} ${sunY} Z`;

  // SVG 관련 계산
  const viewBox = `${-radius} ${-radius} ${radius * 2} ${radius}`;
  const semicircleStrokePath = `M -${radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`;

  const clipId = useId();

  return {
    progress,
    sunX,
    sunY,
    largeArcFlag,
    shouldShowSun,
    semicirclePath,
    sectorPath,
    clipId,
    targetSunPosition,
    radius,
    viewBox,
    semicircleStrokePath,
  };
};
