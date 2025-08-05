import { CommonStyles } from '@/styles/commonStyles';

const WeatherBoardWeekly = () => {
  return (
    <div css={CommonStyles.weatherBoardContainer}>
      <div>
        <h3>7일 간의 날씨 예보</h3>
      </div>
    </div>
  );
};

export default WeatherBoardWeekly;
