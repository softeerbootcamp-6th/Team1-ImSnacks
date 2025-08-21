import { Assets, ColorStatus, GrayScale } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const Container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const Content = css`
  background: white;
  padding: 60px 40px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const Title = css`
  ${Typography.Headline};
  color: ${ColorStatus.Global.Red};
  margin-bottom: 16px;
  line-height: 1;
`;

const Subtitle = css`
  ${Typography.Subtitle_700};
  color: ${GrayScale.G900};
  margin-bottom: 16px;
`;

const Message = css`
  ${Typography.Body_S_400};
  color: ${GrayScale.G600};
  margin-bottom: 32px;
  line-height: 1.5;
  word-break: keep-all;
`;

const LinkButton = css`
  display: inline-block;
  background-color: ${Assets.Text.Button.SelectChip.Disabled};
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
    background-color: ${Assets.Global.Button.Default};
  }
`;

export default {
  Container,
  Content,
  Title,
  Subtitle,
  Message,
  LinkButton,
};
