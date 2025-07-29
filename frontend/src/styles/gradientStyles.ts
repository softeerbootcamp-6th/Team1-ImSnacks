import { css } from '@emotion/react';
import { Gradient, Opacity, GrayScale } from './colors';

// Gradient 스타일 객체
export const gradientStyles = {
  // CardStroke Angular
  cardStrokeAngular: css`
    background: conic-gradient(
      from 0deg at 50% 50%,
      rgba(255, 255, 255, ${Gradient.CardStroke.W0})
        ${Gradient.CardStroke.Angular.stops[0].position},
      rgba(255, 255, 255, ${Gradient.CardStroke.W1000})
        ${Gradient.CardStroke.Angular.stops[1].position},
      rgba(255, 255, 255, ${Gradient.CardStroke.W0})
        ${Gradient.CardStroke.Angular.stops[2].position},
      rgba(255, 255, 255, ${Gradient.CardStroke.W1000})
        ${Gradient.CardStroke.Angular.stops[3].position}
    );
  `,

  // CardStroke Dark Angular
  cardStrokeDarkAngular: css`
    background: conic-gradient(
      from 0deg at 50% 50%,
      rgba(56, 48, 72, ${Opacity.G900['9o0']})
        ${Gradient.CardStroke.Dark.Angular.stops[0].position},
      ${GrayScale.G900} ${Gradient.CardStroke.Dark.Angular.stops[1].position},
      rgba(56, 48, 72, ${Opacity.G900['9o0']})
        ${Gradient.CardStroke.Dark.Angular.stops[2].position},
      ${GrayScale.G900} ${Gradient.CardStroke.Dark.Angular.stops[3].position}
    );
  `,

  // Background Afternoon Clear Linear
  backgroundAfternoonClear: css`
    background: linear-gradient(
      to right,
      ${Gradient.Background.Afternoon.Clear.Linear.from}
        ${Gradient.Background.Afternoon.Clear.Linear.stops[0].position},
      ${Gradient.Background.Afternoon.Clear.Linear.to}
        ${Gradient.Background.Afternoon.Clear.Linear.stops[1].position}
    );
  `,

  // Background Afternoon Cloudy Linear
  backgroundAfternoonCloudy: css`
    background: linear-gradient(
      to right,
      ${Gradient.Background.Afternoon.Cloudy.Linear.from}
        ${Gradient.Background.Afternoon.Cloudy.Linear.stops[0].position},
      ${Gradient.Background.Afternoon.Cloudy.Linear.to}
        ${Gradient.Background.Afternoon.Cloudy.Linear.stops[1].position}
    );
  `,

  // Background Afternoon Hot Linear
  backgroundAfternoonHot: css`
    background: linear-gradient(
      to right,
      ${Gradient.Background.Afternoon.Hot.Linear.from}
        ${Gradient.Background.Afternoon.Hot.Linear.stops[0].position},
      ${Gradient.Background.Afternoon.Hot.Linear.to}
        ${Gradient.Background.Afternoon.Hot.Linear.stops[1].position}
    );
  `,

  // Background Night Clear Linear
  backgroundNightClear: css`
    background: linear-gradient(
      to right,
      ${Gradient.Background.Night.Clear.Linear.from}
        ${Gradient.Background.Night.Clear.Linear.stops[0].position},
      ${Gradient.Background.Night.Clear.Linear.to}
        ${Gradient.Background.Night.Clear.Linear.stops[1].position}
    );
  `,

  // Conic Background
  conicBackground: css`
    background: conic-gradient(
      from ${Gradient.Conic.Background.from} at ${Gradient.Conic.Background.at},
      ${Gradient.Conic.Background.stops
        .map(stop => `${stop.color} ${stop.position}`)
        .join(', ')}
    );
  `,

  // CardStroke 기본값들
  cardStroke: {
    W0: css`
      background: rgba(255, 255, 255, ${Gradient.CardStroke.W0});
    `,
    W1000: css`
      background: rgba(255, 255, 255, ${Gradient.CardStroke.W1000});
    `,
  },
};
