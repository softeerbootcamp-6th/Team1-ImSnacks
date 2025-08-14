import { Assets } from '@/styles/colors';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const DamageCard = (selectedRiskName: string | null, name: string) => css`
  width: 342px;
  height: 218px;
  position: relative;
  backdrop-filter: blur(6px);
  border-radius: 16px;
  cursor: pointer;
  opacity: ${selectedRiskName && selectedRiskName !== name ? 0.2 : 1};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: ${selectedRiskName !== name && 'rotate(10deg)'};
  }
`;

const DamageCardTitle = css`
  ${Typography.Subtitle_700}
  color: ${Assets.Text.Global.Headline};
`;

const DamageCardDescription = css`
  ${Typography.Body_S_400}
  color: ${Assets.Text.Global.Body};
  width: 70%;
`;

export default {
  DamageCard,
  DamageCardTitle,
  DamageCardDescription,
};
