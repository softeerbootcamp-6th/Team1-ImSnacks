import { CommonStyles } from '@/styles/commonStyles';
const WeatherBoardTemparature = () => {
  return (
    <div css={CommonStyles.weatherBoardContainer}>
      <div>
        <h3>최고기온</h3>
        <p>30°C</p>
      </div>
    </div>
  );
};

export default WeatherBoardTemparature;
