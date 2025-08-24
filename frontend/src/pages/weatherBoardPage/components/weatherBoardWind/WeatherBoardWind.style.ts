import { CommonStyles, FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';
import { getArrowPosition } from '../../utils/windUtil';

const WeatherBoardWind = css`
  ${CommonStyles.weatherBoardContainer}
  ${FlexStyles.flexColumn}
  box-sizing: border-box;
`;

const WeatherBoardWindContentWrapper = css`
  padding-top: 32px;
  ${FlexStyles.flexColumn}
`;

const WeatherBoardWindContent = css`
  margin: 11px 0 17px 0;
  height: 108px;
  width: 108px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const WindArrow = (degree: number) => {
  const generateKeyframes = (targetDegree: number) => {
    const steps = Math.min(targetDegree, 36);
    const stepSize = targetDegree / steps;

    let keyframes = '';
    for (let i = 0; i <= steps; i++) {
      const currentDegree = Math.round(i * stepSize);
      const percentage = (i / steps) * 100;
      const position = getArrowPosition(currentDegree);
      keyframes += `
        ${percentage}% {
          transform: ${position.transform};
        }
      `;
    }

    return keyframes;
  };

  return css`
    position: absolute;
    top: 50%;
    transform-origin: center;
    animation: windRotation-${degree} 1.7s ease-out forwards;

    @keyframes windRotation-${degree} {
      ${generateKeyframes(degree)}
    }
  `;
};

const WindArrowInitial = css`
  position: absolute;
  top: 50%;
  transform-origin: center;
  ${getArrowPosition(0)};
`;

export default {
  WeatherBoardWind,
  WeatherBoardWindContentWrapper,
  WeatherBoardWindContent,
  WindArrow,
  WindArrowInitial,
};
