import { css } from '@emotion/react';
import { gradientStyles } from '@/styles/gradientStyles';
import RegisterWorkContainer from './components/RegisterWorkContainer';

const HomePage = () => {
  return (
    <div
      css={css`
        ${gradientStyles.backgroundAfternoonClear}
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <RegisterWorkContainer />
    </div>
  );
};

export default HomePage;
