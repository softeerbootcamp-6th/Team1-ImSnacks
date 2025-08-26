import { FLAT_ICON } from '@/constants/iconElements/flatIcons';
import S from './WeeklyContent.style';
import type { GetSevenDaysForecastResponse } from '@/types/openapiGenerator';

const WeeklyContent = ({
  dayOfWeek,
  weatherCondition,
  minTemperature,
  maxTemperature,
}: GetSevenDaysForecastResponse) => {
  const FlatIconComponent = weatherCondition
    ? FLAT_ICON[weatherCondition]
    : null;

  return (
    <div css={S.WeeklyContent}>
      <div css={S.WeeklyTitle}>{dayOfWeek}</div>
      <div css={S.WeeklyWeatherIconWrapper}>
        {FlatIconComponent && <FlatIconComponent width={32} height={32} />}
      </div>
      <div css={S.WeeklyTemperature}>
        {maxTemperature}° / {minTemperature}°
      </div>
    </div>
  );
};

export default WeeklyContent;
