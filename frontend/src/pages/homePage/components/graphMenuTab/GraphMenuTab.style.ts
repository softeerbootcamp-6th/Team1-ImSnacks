import { Assets, ColorPrimary, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const GraphMenuTab = css``;

const GraphMenuTabActive = css`
  display: flex;
  padding: var(--Spacing-200, 4px) var(--Spacing-400, 12px)
    var(--Spacing-200, 4px) var(--Spacing-300, 8px);
  justify-content: center;
  align-items: center;
  gap: ${Spacing.Spacing100};

  border-radius: 200px;
  background-color: ${ColorPrimary.B700};
  color: ${GrayScale.White};

  svg path {
    fill: ${GrayScale.White};
  }
`;

const GraphMenuTabDefault = css`
  display: inline-flex;
  padding: ${Spacing.Spacing200};
  justify-content: center;
  align-items: center;

  border-radius: 200px;
  background-color: ${GrayScale.White};

  svg {
    color: ${Assets.Global.Button.Default};
    transition: color 0.2s ease;
  }

  &:hover {
    background-color: ${ColorPrimary.B300};
    svg path {
      fill: ${GrayScale.White};
    }
  }
`;

export default {
  GraphMenuTab,
  GraphMenuTabActive,
  GraphMenuTabDefault,
};
