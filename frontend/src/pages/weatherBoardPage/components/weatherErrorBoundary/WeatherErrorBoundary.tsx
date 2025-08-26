import React from 'react';
import { css } from '@emotion/react';
import { Typography } from '@/styles/typography';
import { GrayScale } from '@/styles/colors';
import { FlexStyles } from '@/styles/flexStyles';

interface WeatherErrorBoundaryProps {
  title?: string;
}

interface WeatherErrorBoundaryState {
  hasError: boolean;
}

class WeatherErrorBoundary extends React.Component<
  React.PropsWithChildren<WeatherErrorBoundaryProps>,
  WeatherErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<WeatherErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WeatherErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Weather component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const { title = '날씨' } = this.props;

      return (
        <div
          css={css`
            ${FlexStyles.flexColumn}
            align-items: center;
            justify-content: center;
            height: 100%;
            width: 100%;
            color: ${GrayScale.White};
            text-align: center;

            h3 {
              ${Typography.Body_M_700}
              margin-bottom: 8px;
              word-break: keep-all;
            }

            p {
              ${Typography.Caption}
              opacity: 0.7;
            }
          `}
        >
          <h3>{title} 정보를 불러오는데 실패했습니다</h3>
          <p>잠시 후 다시 시도해주세요.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WeatherErrorBoundary;
