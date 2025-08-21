import { ColorPrimary } from '@/styles/colors';
import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface CircularSpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
  minHeight?: number;
}

export const CircularSpinner = ({
  size = 40,
  color = ColorPrimary.B400,
  thickness = 4,
  minHeight = 100,
}: CircularSpinnerProps) => (
  <>
    <style>{spinKeyframes}</style>
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        min-height: ${minHeight}px;
      `}
    >
      <div
        css={css`
          width: ${size}px;
          height: ${size}px;
          border: ${thickness}px solid rgba(0, 0, 0, 0.08);
          bordertop: ${thickness}px solid ${color};
          border-radius: 50%;
          animation: spin 1s linear infinite;
          border-top-color: ${color};
          border-top-style: solid;
          border-top-width: ${thickness}px;
          will-change: transform;
        `}
      />
    </div>
  </>
);
