import S from './MobileCurrentWeatherContent.style';
import { FLAT_ICON } from '@/constants/iconElements/flatIcons';
import type {
  GetWeatherGraphResponseWeatherMetricEnum,
  GetWeatherStatusResponse,
} from '@/types/openapiGenerator';
import { getWeatherUnit } from '@/utils/getWeatherUnitUtil';

const MobileCurrentWeatherContent = ({
  metric,
  metricType,
  value,
}: GetWeatherStatusResponse) => {
  const FlatIconComponent = FLAT_ICON[metricType as keyof typeof FLAT_ICON];

  return (
    <div css={S.MobileCurrentWeatherContent}>
      <div>
        <h3>{metric}</h3>
        <p>
          {value}{' '}
          {getWeatherUnit(
            metricType as GetWeatherGraphResponseWeatherMetricEnum
          )}
        </p>
      </div>

      <FlatIconComponent
        width={32}
        height={32}
        css={S.MobileCurrentWeatherIcon}
      />
    </div>
  );
};

export default MobileCurrentWeatherContent;
