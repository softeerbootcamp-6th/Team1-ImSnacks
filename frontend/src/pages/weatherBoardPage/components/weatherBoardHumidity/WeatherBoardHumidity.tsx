import { CommonStyles } from '@/styles/commonStyles';

const WeatherBoardHumidity = () => {
  return (
    <div css={CommonStyles.weatherBoardContainer}>
      <div>
        <h3>습도</h3>
        <p>60%</p>
      </div>
    </div>
  );
};

export default WeatherBoardHumidity;
