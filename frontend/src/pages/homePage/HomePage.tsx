import RegisterWorkContainer from './components/registerWorkContainer/RegisterWorkContainer';
import WorkContainer from './components/workContainer/WorkContainer';
import HeadLine from './components/headLine/HeadLine';
import MainGraph from './components/mainGraph/MainGraph';
import S from './HomePage.style';

const HomePage = () => {
  return (
    <div css={S.MainPage}>
      <HeadLine />
      <MainGraph />
      <WorkContainer />
      <RegisterWorkContainer />
    </div>
  );
};

export default HomePage;
