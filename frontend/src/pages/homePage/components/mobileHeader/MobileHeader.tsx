import { GLASS_MOBILE_ICON } from '@/constants/glassMobileIcon';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import type { WeatherConditionsType } from '@/types/weather.types';
import { css } from '@emotion/react';
import S from './MobileHeader.styles';

interface MobileHeaderProps {
  weatherCondition: WeatherConditionsType;
  weatherKeyword: string;
  temperature: number;
}

const MobileHeader = ({
  weatherCondition,
  weatherKeyword,
  temperature,
}: MobileHeaderProps) => {
  const GlassIconComponent =
    GLASS_MOBILE_ICON[weatherCondition as keyof typeof GLASS_MOBILE_ICON];

  return (
    <div css={S.MobileHeader}>
      <div css={S.MobileHeaderContent}>
        <h1
          css={css`
            ${Typography.Headline};
            color: ${GrayScale.White};
          `}
        >
          {temperature}°
        </h1>
        <div
          css={css`
            ${Typography.Caption_S};
            color: ${GrayScale.White};
            padding-bottom: ${Spacing.Spacing300};
          `}
        >
          7월 23일, {weatherKeyword}
        </div>
      </div>
      <GlassIconComponent width={110} height={88} css={S.MobileHeaderIcon} />
    </div>
  );
};

export default MobileHeader;
