import { css } from '@emotion/react';
import { Gradient, GrayScale, Opacity } from './colors';

// Gradient 스타일 객체
export const gradientStyles = {
  // CardStroke Angular
  cardStrokeAngular: css`
    background: conic-gradient(
      from 0deg at 50% 50%,
      ${Opacity.White.W0} ${Gradient.CardStroke.Angular.stops[0].position},
      ${Opacity.White.W1000} ${Gradient.CardStroke.Angular.stops[1].position},
      ${Opacity.White.W0} ${Gradient.CardStroke.Angular.stops[2].position},
      ${Opacity.White.W1000} ${Gradient.CardStroke.Angular.stops[3].position},
      ${Opacity.White.W0} 100%
    );
  `,

  // CardStroke Dark Angular
  cardStrokeDarkAngular: css`
    background: conic-gradient(
      from 0deg at 50% 50%,
      ${Opacity.G900['9o0']} 10%,
      ${GrayScale.G900} 35%,
      ${Opacity.G900['9o0']} 60%,
      ${GrayScale.G900} 85%,
      ${Opacity.G900['9o0']} 100%
    );
  `,

  // Background Afternoon Clear Linear
  backgroundAfternoonClear: css`
    background: linear-gradient(
      68deg,
      ${Gradient.Background.Afternoon.Clear.Linear.from}
        ${Gradient.Background.Afternoon.Clear.Linear.stops[0].position},
      ${Gradient.Background.Afternoon.Clear.Linear.to}
        ${Gradient.Background.Afternoon.Clear.Linear.stops[1].position}
    );
  `,

  // Background Afternoon Cloudy Linear
  backgroundAfternoonCloudy: css`
    background: linear-gradient(
      36deg,
      ${Gradient.Background.Afternoon.Cloudy.Linear.from}
        ${Gradient.Background.Afternoon.Cloudy.Linear.stops[0].position},
      ${Gradient.Background.Afternoon.Cloudy.Linear.to}
        ${Gradient.Background.Afternoon.Cloudy.Linear.stops[1].position}
    );
  `,

  // Background Afternoon Hot Linear
  backgroundAfternoonHot: css`
    background: linear-gradient(
      36deg,
      ${Gradient.Background.Afternoon.Hot.Linear.from}
        ${Gradient.Background.Afternoon.Hot.Linear.stops[0].position},
      ${Gradient.Background.Afternoon.Hot.Linear.to}
        ${Gradient.Background.Afternoon.Hot.Linear.stops[1].position}
    );
  `,

  // Background Night Clear Linear
  backgroundNightClear: css`
    background: linear-gradient(
      46deg,
      ${Gradient.Background.Night.Clear.Linear.from}
        ${Gradient.Background.Night.Clear.Linear.stops[0].position},
      ${Gradient.Background.Night.Clear.Linear.to}
        ${Gradient.Background.Night.Clear.Linear.stops[1].position}
    );
  `,

  // Weather Board Background
  backgroundWeatherBoard: css`
    background: linear-gradient(
      221deg,
      ${Gradient.Background.WeatherBoard.Linear.from}
        ${Gradient.Background.WeatherBoard.Linear.stops[0].position},
      ${Gradient.Background.WeatherBoard.Linear.to}
        ${Gradient.Background.WeatherBoard.Linear.stops[1].position}
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
