import { GrayScale } from '@/styles/colors';
import { FlexStyles } from '@/styles/flexStyles';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const MobileHomePage = css`
  ${FlexStyles.flexColumn};
  width: 100%;
  margin-top: 67px;
  margin-bottom: 32px;
`;

const MobileHomeContentWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Spacing.Spacing1100};
  align-self: stretch;
  padding: 0 ${Spacing.Spacing600};

  h2 {
    ${Typography.Mobile_Headline};
    color: ${GrayScale.White};
  }
`;

export default {
  MobileHomePage,
  MobileHomeContentWrapper,
};
