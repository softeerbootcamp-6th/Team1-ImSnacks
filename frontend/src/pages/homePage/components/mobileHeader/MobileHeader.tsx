import { GLASS_MOBILE_ICON } from '@/constants/glassMobileIcon';
import { GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { Typography } from '@/styles/typography';
import type { WeatherConditionsType } from '@/types/weather.types';
import { css } from '@emotion/react';
import S from './MobileHeader.styles';
import { useTimeStore } from '@/store/useTimeStore';
import { formatCurrentTime } from '@/utils/formatTimeUtil';

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

  const { currentTime } = useTimeStore();

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
          {formatCurrentTime(currentTime).date}, {weatherKeyword}
        </div>
      </div>
      <GlassIconComponent width={110} height={88} css={S.MobileHeaderIcon} />
    </div>
  );
};

export default MobileHeader;
