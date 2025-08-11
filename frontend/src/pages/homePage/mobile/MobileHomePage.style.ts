import { FlexStyles } from '@/styles/commonStyles';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const MobileHomePage = css`
  ${FlexStyles.flexColumn};
  width: 100%;
  margin-top: 87px;
`;

const MobileHomeContentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Spacing.Spacing1100};
  align-self: stretch;
`;

export default {
  MobileHomePage,
  MobileHomeContentWrapper,
};
