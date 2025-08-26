import type { GetWeatherGraphResponse } from '@/types/openapiGenerator/models/all';
import { useRef, useState, useCallback, useEffect } from 'react';

export const useMainLineChartCoords = (graphData: GetWeatherGraphResponse) => {
  const dotPosRef = useRef<
    Record<string, { x: number; y: number; index: number }>
  >({});

  const [dotPos, setDotPos] = useState<
    Record<string, { x: number; y: number; index: number }>
  >({});

  const [coordsCommitted, setCoordsCommitted] = useState<boolean>(false);

  const captureDot = useCallback(
    (name: string, index: number, cx: number, cy: number) => {
      if (name != null && typeof cx === 'number' && typeof cy === 'number') {
        dotPosRef.current[String(name)] = { x: cx, y: cy, index };
      }
    },
    []
  );

  const handleLineAnimEnd = useCallback(() => {
    if (coordsCommitted) return;
    setDotPos({ ...dotPosRef.current });
    setCoordsCommitted(true);
  }, [coordsCommitted]);

  useEffect(() => {
    dotPosRef.current = {};
    setDotPos({});
    setCoordsCommitted(false);
  }, [graphData]);

  const getDotX = useCallback(
    (time: string) => (time ? dotPos[String(time)]?.x ?? null : null),
    [dotPos]
  );

  return { captureDot, handleLineAnimEnd, getDotX };
};
