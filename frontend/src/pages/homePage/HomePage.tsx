import RegisterWorkContainer from './components/registerWorkContainer/RegisterWorkContainer';
import WorkContainer from './components/workContainer/WorkContainer';
import HeadLine from './components/headLine/HeadLine';
import MainGraph from './components/mainGraph/MainGraph';
import S from './HomePage.style';
import { WorkBlocksProvider } from '@/contexts/WorkBlocksProvider';

const HomePage = () => {
  return (
    <div css={S.MainPage}>
      <HeadLine />
      <MainGraph />
      <WorkBlocksProvider>
        <WorkContainer />
        <RegisterWorkContainer />
      </WorkBlocksProvider>
    </div>
  );
};

export default HomePage;
