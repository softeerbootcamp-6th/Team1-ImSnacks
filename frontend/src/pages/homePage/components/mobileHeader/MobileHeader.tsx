import { FLAT_ICON } from '@/constants/flatIcons';
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
  const FlatIconComponent =
    FLAT_ICON[weatherCondition as keyof typeof FLAT_ICON];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '0 20px',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        alignSelf: 'stretch',
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
            ${Typography.Headline}
            color: ${GrayScale.White}
          `}
        >
          {temperature}°
        </h1>
        <div
          css={css`
            ${Typography.Caption_S}
            color: ${GrayScale.White}
          `}
        >
          7월 23일, {weatherKeyword}
        </div>
      </div>
      <FlatIconComponent width={100} height={78} />
    </div>
  );
};

export default MobileHeader;
