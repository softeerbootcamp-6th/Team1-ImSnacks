import { Assets, ColorStatus, GrayScale } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';

const Container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 20px;
`;

const Content = css`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
`;

const Title = css`
  ${Typography.Subtitle_700};
  color: ${ColorStatus.Global.Red};
  margin-bottom: 16px;
`;

const Message = css`
  ${Typography.Body_S_400};
  color: ${GrayScale.G700};
  margin-bottom: 8px;
  line-height: 1.5;
  word-break: keep-all;
`;

const SubMessage = css`
  ${Typography.Caption};
  color: ${GrayScale.G600};
  line-height: 1.4;
  margin-bottom: 24px;
`;

const LinkButton = (theme: Theme) => css`
  display: inline-block;
  background-color: ${theme.ColorPrimary.B700};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${Assets.Global.Button.Hover};
  }
  &:active {
    background-color: ${theme.ColorPrimary.B300};
  }
`;

export default {
  Container,
  Content,
  Title,
  Message,
  SubMessage,
  LinkButton,
};
