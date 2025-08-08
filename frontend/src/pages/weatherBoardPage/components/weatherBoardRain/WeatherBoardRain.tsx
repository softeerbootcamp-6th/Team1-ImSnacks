import { CommonStyles } from '@/styles/commonStyles';

const WeatherBoardRain = () => {
  return (
    <div css={CommonStyles.weatherBoardContainer}>
      <div>
        <h3>강수량</h3>
        <p>10mm</p>
      </div>
    </div>
  );
};

export default WeatherBoardRain;
