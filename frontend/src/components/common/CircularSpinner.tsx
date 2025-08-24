import { ColorPrimary } from '@/styles/colors';
import { css, useTheme } from '@emotion/react';

const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface CircularSpinnerProps {
  size?: number;
  thickness?: number;
  color?: string;
  minHeight?: number;
}

export const CircularSpinner = (props: CircularSpinnerProps) => {
  const theme = useTheme();
  const {
    size = 40,
    thickness = 4,
    color = theme.ColorPrimary.B700,
    minHeight = 100,
  } = props;

  return (
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
            border-top: ${thickness}px solid ${color};
            border-radius: 50%;
            animation: spin 1s linear infinite;
            will-change: transform;
          `}
        />
      </div>
    </>
  );
};
