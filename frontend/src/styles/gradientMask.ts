import { css } from '@emotion/react';

interface GradientMaskOptions {
  direction?: 'to bottom' | 'to top' | 'to left' | 'to right';
  fadeDistance?: number;
  fadeStart?: number;
}

export const createGradientMask = (options: GradientMaskOptions = {}) => {
  const {
    direction = 'to bottom',
    fadeDistance = 200,
    fadeStart = 0,
  } = options;

  const startOpacity = 1;
  const endOpacity = 0;

  // fadeStart가 0이면 시작부터 그라데이션, 아니면 fadeStart 지점부터 그라데이션
  const gradientStops =
    fadeStart === 0
      ? `rgba(0,0,0,${startOpacity}) 0%, rgba(0,0,0,${startOpacity}) calc(100% - ${fadeDistance}px), rgba(0,0,0,${endOpacity}) 100%`
      : `rgba(0,0,0,${startOpacity}) 0%, rgba(0,0,0,${startOpacity}) ${fadeStart}%, rgba(0,0,0,${startOpacity}) calc(100% - ${fadeDistance}px), rgba(0,0,0,${endOpacity}) 100%`;

  return css`
    -webkit-mask-image: linear-gradient(${direction}, ${gradientStops});
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-image: linear-gradient(${direction}, ${gradientStops});
    mask-repeat: no-repeat;
    mask-size: 100% 100%;
  `;
};

export const bottomGradientMask = (fadeDistance = 200) =>
  createGradientMask({ direction: 'to bottom', fadeDistance });

export const topGradientMask = (fadeDistance = 200) =>
  createGradientMask({ direction: 'to top', fadeDistance });

export const leftGradientMask = (fadeDistance = 200) =>
  createGradientMask({ direction: 'to left', fadeDistance });

export const rightGradientMask = (fadeDistance = 200) =>
  createGradientMask({ direction: 'to right', fadeDistance });
