import WorkBlocksProvider from '@/contexts/WorkBlocksProvider';
import HeadLine from '../components/headLine/HeadLine';
import MainGraph from '../components/mainGraph/MainGraph';
import S from './DesktopHomePage.style';
import WorkContainer from '../components/workContainer/WorkContainer';
import RegisterWorkContainer from '../components/registerWorkContainer/RegisterWorkContainer';

const DesktopHomePage = () => {
  return (
    <div css={S.DesktopHomePage}>
      <HeadLine />
      <MainGraph />
      <WorkBlocksProvider>
        <WorkContainer />
        <RegisterWorkContainer />
      </WorkBlocksProvider>
    </div>
  );
};

export default DesktopHomePage;
