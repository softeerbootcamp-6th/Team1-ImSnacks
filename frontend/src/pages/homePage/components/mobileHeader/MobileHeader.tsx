import { GLASS_MOBILE_ICON } from '@/constants/glassMobileIcon';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import type { WeatherConditionsType } from '@/types/weather.types';
import { css } from '@emotion/react';

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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        margin: '0 20px 32px 20px',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: Spacing.Spacing300,
        }}
      >
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
      <GlassIconComponent
        width={110}
        height={88}
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          z-index: 1;
        `}
      />
    </div>
  );
};

export default MobileHeader;
