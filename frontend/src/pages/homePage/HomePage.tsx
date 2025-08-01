import { css } from '@emotion/react';
import RegisterWorkContainer from './components/registerWorkContainer/RegisterWorkContainer';
import WorkContainer from './components/workContainer/WorkContainer';
import HeadLine from './components/headLine/HeadLine';
import MainPageGraph from './components/mainPageGraph/MainPageGraph';

const HomePage = () => {
  return (
    <div
      css={css`
        margin-top: 172px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `}
    >
      <HeadLine />
      <MainPageGraph />
      <WorkContainer />
      <RegisterWorkContainer />
    </div>
  );
};

export default HomePage;
