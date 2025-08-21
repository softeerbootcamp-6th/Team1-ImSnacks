import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';

const MyFarmPageWrapper = css`
  display: flex;
  padding: ${Spacing.Spacing1100} 0;
  align-items: center;
  justify-content: center;
`;

const MyFarmPageContentWrapper = css`
  padding: ${Spacing.Spacing1100} 0;
  gap: ${Spacing.Spacing1100};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default { MyFarmPageWrapper, MyFarmPageContentWrapper };
