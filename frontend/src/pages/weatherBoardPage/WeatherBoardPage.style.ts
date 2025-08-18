import { GrayScale } from '@/styles/colors';
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

const MyFarmAddress = css`
  ${Typography.Body_S_400};
  color: ${GrayScale.G50};
  height: 24px;
`;

const WeatherBoardContent = css`
  width: 100%;
  gap: 24px;
`;

export default {
  WeatherBoardPage,
  MyFarmAddress,
  WeatherBoardContent,
};
