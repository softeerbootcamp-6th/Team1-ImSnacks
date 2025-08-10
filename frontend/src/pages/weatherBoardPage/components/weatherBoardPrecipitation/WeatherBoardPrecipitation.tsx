import { usePrecipitationSvg } from '../../hooks/usePrecipitationSvg';
import S from './WeatherBoardPrecipitation.style';

const WeatherBoardPrecipitation = ({ value }: { value: number }) => {
  const { svgElement } = usePrecipitationSvg({ value });

  return (
    <div css={S.WeatherBoardPrecipitation}>
      <div css={S.WeatherBoardPrecipitationTitle}>
        <h3>최고 강수량</h3>
        <p>
          {value}mm {value >= 30 && '이상'}
        </p>
      </div>

      {svgElement && (
        <div
          style={{
            marginTop: 'auto',
            width: '100%',
          }}
          css={S.WeatherBoardPrecipitationSvg}
        >
          {svgElement}
        </div>
      )}
    </div>
  );
};

export default WeatherBoardPrecipitation;
