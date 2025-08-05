import { CommonStyles } from '@/styles/commonStyles';

const WeatherBoardWind = () => {
  return (
    <div css={CommonStyles.weatherBoardContainer}>
      <div>
        <h3>최고 풍속</h3>
        <p>남서풍 10m/s</p>
      </div>
    </div>
  );
};

export default WeatherBoardWind;
