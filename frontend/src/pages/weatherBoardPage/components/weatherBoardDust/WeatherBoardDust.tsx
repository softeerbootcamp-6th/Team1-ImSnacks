import { CommonStyles } from '@/styles/commonStyles';
import { FlexStyles } from '@/styles/commonStyles';

const WeatherBoardDust = () => {
  return (
    <div css={[CommonStyles.weatherBoardContainer, FlexStyles.flexRow]}>
      <div>
        <h3>미세먼지(PM10)</h3>
        <p>보통</p>
      </div>
      <div>
        <h3>초미세먼지(PM2.5)</h3>
        <p>매우 나쁨</p>
      </div>
    </div>
  );
};

export default WeatherBoardDust;
