import { css } from '@emotion/react';
import { gradientStyles } from '@/styles/gradientStyles';
import RegisterWorkContainer from './components/registerWorkContainer/RegisterWorkContainer';
import WorkContainer from './components/workContainer/WorkContainer';

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
      <WorkContainer />
      <RegisterWorkContainer />
    </div>
  );
};

export default HomePage;
