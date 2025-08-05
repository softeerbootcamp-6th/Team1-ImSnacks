import { CommonStyles } from '@/styles/commonStyles';

const WeatherBoardUV = () => {
  return (
    <div css={CommonStyles.weatherBoardContainer}>
      <div>
        <h3>자외선</h3>
        <p>8</p>
      </div>
    </div>
  );
};

export default WeatherBoardUV;
