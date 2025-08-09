import { CommonStyles } from '@/styles/commonStyles';
import S from './WeatherBoardPrecipitation.style';

const WeatherBoardRain = () => {
  return (
    <div css={S.WeatherBoardPrecipitation}>
      <div>
        <h3>최고 강수량</h3>
        <p>10mm</p>
      </div>
      <div></div>
    </div>
  );
};

export default WeatherBoardRain;
