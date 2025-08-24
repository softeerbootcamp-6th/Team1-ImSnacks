import { Opacity } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import { Typography } from '@/styles/typography';

const WeeklyNavigator = css`
  display: flex;
  min-width: 120px;
  height: 32px;
  align-items: center;
  justify-content: space-between;

  background-color: ${Opacity.White.W300};
  ${Typography.Body_S_400}
  padding: ${Spacing.Spacing200};
  gap: ${Spacing.Spacing200};
  border-radius: ${BorderRadius.Base.Hard};
`;

const onMoveButton = css`
  background: none;
  border: none;

  cursor: pointer;
  padding: ${Spacing.Spacing100};
  border-radius: ${BorderRadius.Base.S_Hard};
  transition: background-color 0.2s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${Opacity.White.W200};
  }
`;

export default {
  WeeklyNavigator,
  onMoveButton,
};
