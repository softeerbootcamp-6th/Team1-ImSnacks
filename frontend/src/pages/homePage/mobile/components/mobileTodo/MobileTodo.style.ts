import { BorderRadius } from '@/styles/borderRadius';
import { GrayScale, Opacity } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const MobileTodo = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${Spacing.Spacing300};
  align-self: stretch;
`;

const MobileTodoList = css`
  display: flex;
  flex-direction: column;
  padding: ${Spacing.Spacing300};
  align-items: flex-start;
  gap: ${Spacing.Spacing200};
  align-self: stretch;
  border-radius: ${BorderRadius.Base.Soft};
  border: 1px solid ${GrayScale.White};
  background: ${Opacity.White.W200};
`;

const EmptyTodoMessage = css`
  ${Typography.Body_S_700};
  color: ${GrayScale.White};
  width: 100%;
  text-align: center;
`;

export default {
  MobileTodo,
  MobileTodoList,
  EmptyTodoMessage,
};
