import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';

const WeatherBoardPrecipitation = css`
  ${CommonStyles.weatherBoardContainer}
  padding: 10px;
  ${FlexStyles.flexColumn}
  justify-content: flex-end;
  position: relative;
  box-sizing: border-box;
`;

const WeatherBoardPrecipitationTitle = css`
  position: absolute;
  top: 20px;
  right: 17px;
  text-align: right;
  z-index: 1;
`;

const WeatherBoardPrecipitationSvg = css`
  margin-top: auto;
  width: 100%;
  animation: fillUp 1s ease-out;
  clip-path: inset(100% 0 0 0);
  animation-fill-mode: forwards;

  @keyframes fillUp {
    from {
      clip-path: inset(100% 0 0 0);
    }
    to {
      clip-path: inset(0% 0 0 0);
    }
  }
`;

const WaveShake = css`
  transition: transform 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
  /* hover 시에만 애니메이션 적용 */
`;

const WaveShakeActive = css`
  animation: waveShake 1.2s linear infinite;
  @keyframes waveShake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-8px);
    }
    50% {
      transform: translateX(0px);
    }
    75% {
      transform: translateX(8px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export default {
  WeatherBoardPrecipitation,
  WeatherBoardPrecipitationTitle,
  WeatherBoardPrecipitationSvg,
  WaveShake,
  WaveShakeActive,
};
