import { GrayScale } from '@/styles/colors';
import { FlexStyles } from '@/styles/flexStyles';
import { Typography } from '@/styles/typography';
import { css } from '@emotion/react';

const WeatherBoardPage = css`
  margin-top: 164px;
  color: ${GrayScale.White};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1328px;
  margin-bottom: 108px;
`;

const MyFarmAddressWrapper = css`
  width: 100%;
  text-align: start;
  margin-bottom: 4px;
`;

const MyFarmAddress = css`
  ${Typography.Body_S_400};
  color: ${GrayScale.G50};
  height: 24px;
`;

const WeatherBoardContent = css`
  width: 100%;
  gap: 24px;
`;

const WeatherBoardFirRow = css`
  ${FlexStyles.flexRow};
  justify-content: space-between;
  width: 100%;
  height: 588px;
`;

const WeatherBoardTemperatureWrapper = css`
  width: 100%;
  height: 280px;
`;

const WeatherBoardWeeklyWrapper = css`
  width: 314px;
  height: 100%;
`;

const WeatherBoardSecRow = css`
  ${FlexStyles.flexRow};
  justify-content: space-between;
  height: 284px;
  ${WeatherBoardContent}
`;

const WeatherBoardThirdRow = css`
  ${FlexStyles.flexRow};
  justify-content: space-between;
  height: 205px;
  ${WeatherBoardContent}
`;

export default {
  WeatherBoardPage,
  MyFarmAddressWrapper,
  MyFarmAddress,
  WeatherBoardContent,
  WeatherBoardFirRow,
  WeatherBoardTemperatureWrapper,
  WeatherBoardWeeklyWrapper,
  WeatherBoardSecRow,
  WeatherBoardThirdRow,
};
