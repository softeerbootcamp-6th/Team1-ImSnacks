import type { ReactElement } from 'react';
import { ColorPrimary } from '@/styles/colors';
import { calculateHeightRatio } from '../utils/precipitationUtil';

interface UsePrecipitationSvgProps {
  value: number;
}

interface PrecipitationSvgData {
  totalHeight: number;
  rectY: number;
  rectHeight: number;
  bottomY: number;
  bottomEndY: number;
  bottomTotalY: number;
  svgElement: ReactElement | null;
}

export const usePrecipitationSvg = ({
  value,
}: UsePrecipitationSvgProps): PrecipitationSvgData => {
  const heightRatio = calculateHeightRatio(value);

  // SVG 레이어 높이 설정
  const waveHeight = 8; // 물결 영역 높이
  const bottomHeight = 18; // 하단 둥근 모서리 높이
  const maxRectHeight = 220; // 최대 rect 높이 (부모에 맞게 조정)
  const rectHeight = Math.max(1, maxRectHeight * heightRatio);
  const totalHeight = waveHeight + rectHeight + bottomHeight;

  // Y 좌표 계산
  const rectY = waveHeight;
  const bottomY = waveHeight + rectHeight;
  const bottomEndY = bottomY + 10; // 둥근 모서리 내부 높이
  const bottomTotalY = bottomY + bottomHeight; // 전체 하단 높이

  // SVG 엘리먼트 생성
  const svgElement =
    value > 0 ? (
      <svg
        width="100%"
        height={totalHeight}
        viewBox={`0 0 294 ${totalHeight}`}
        fill="none"
      >
        <path
          d="M0 8.05806C0 8.05806 20.5936 0 36.75 0C52.9064 0 57.3436 8.05806 73.5 8.05806C89.6564 8.05806 94.0936 0 110.25 0C126.406 0 130.844 8.05806 147 8.05806C163.156 8.05806 167.594 0 183.75 0C199.906 0 204.344 8.05806 220.5 8.05806C236.656 8.05806 241.094 0 257.25 0C273.406 0 294 8.05806 294 8.05806H0Z"
          fill={ColorPrimary.B400}
        />
        <rect
          x="0"
          y={rectY}
          width="294"
          height={rectHeight + 1}
          fill={ColorPrimary.B400}
        />
        <path
          d={`M0 ${bottomY}H294V${bottomEndY}C294 ${
            bottomEndY + 4
          } 290.418 ${bottomTotalY} 286 ${bottomTotalY}H8C3.58172 ${bottomTotalY} 0 ${
            bottomEndY + 4
          } 0 ${bottomEndY}V${bottomY}Z`}
          fill={ColorPrimary.B400}
        />
      </svg>
    ) : null;

  return {
    totalHeight,
    rectY,
    rectHeight,
    bottomY,
    bottomEndY,
    bottomTotalY,
    svgElement,
  };
};
