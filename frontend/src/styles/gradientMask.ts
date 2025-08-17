import { css } from '@emotion/react';

export const gradientMask = (
  direction = 'Bottom',
  fadeDistance = 200,
  fadeStart = 0
) => {
  const startOpacity = 1;
  const endOpacity = 0;

  // fadeStart가 0이면 시작부터 그라데이션, 아니면 fadeStart 지점부터 그라데이션
  const gradientStops =
    fadeStart === 0
      ? `rgba(0,0,0,${startOpacity}) 0%, rgba(0,0,0,${startOpacity}) calc(100% - ${fadeDistance}px), rgba(0,0,0,${endOpacity}) 100%`
      : `rgba(0,0,0,${startOpacity}) 0%, rgba(0,0,0,${startOpacity}) ${fadeStart}%, rgba(0,0,0,${startOpacity}) calc(100% - ${fadeDistance}px), rgba(0,0,0,${endOpacity}) 100%`;

  return css`
    -webkit-mask-image: linear-gradient(to ${direction}, ${gradientStops});
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-image: linear-gradient(to ${direction}, ${gradientStops});
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
  `;
};
