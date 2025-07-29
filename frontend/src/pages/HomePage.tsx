import { css } from '@emotion/react';
import { gradientStyles } from '../styles/gradientStyles';

const HomePage = () => {
  return (
    <div
      css={css`
        ${gradientStyles.backgroundAfternoonCloudy}
        width: 100vw;
        height: 100vh;
      `}
    >
      오후 맑은 하늘 배경
    </div>
  );
};

export default HomePage;
