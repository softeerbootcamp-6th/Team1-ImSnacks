import RegisterWorkContainer from './components/registerWorkContainer/RegisterWorkContainer';
import WorkContainer from './components/workContainer/WorkContainer';
import HeadLine from './components/headLine/HeadLine';
import MainPageGraph from './components/mainPageGraph/MainPageGraph';
import S from './HomePage.styles';

const HomePage = () => {
  return (
    <div css={S.MainPage}>
      <HeadLine />
      <MainPageGraph />
      <WorkContainer />
      <RegisterWorkContainer />
    </div>
  );
};

export default HomePage;
