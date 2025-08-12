import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const MobileHeader = css`
  display: flex;
  flex-direction: row;
  margin: 0 20px 32px 20px;
  justify-content: space-between;
  align-items: flex-end;
  align-self: stretch;
  position: relative;
`;

const MobileHeaderContent = css`
  display: flex;
  align-items: flex-end;
  gap: ${Spacing.Spacing300};
`;

const MobileHeaderIcon = css`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

export default {
  MobileHeader,
  MobileHeaderContent,
  MobileHeaderIcon,
};
