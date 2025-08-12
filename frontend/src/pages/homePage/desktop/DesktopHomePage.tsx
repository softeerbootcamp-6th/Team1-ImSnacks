import WorkBlocksProvider from '@/contexts/WorkBlocksProvider';
import Headline from '../components/headline/Headline';
import MainGraph from '../components/mainGraph/MainGraph';
import S from './DesktopHomePage.style';
import WorkContainer from '../components/workContainer/WorkContainer';
import RegisterWorkContainer from '../components/registerWorkContainer/RegisterWorkContainer';

const DesktopHomePage = () => {
  return (
    <div css={S.DesktopHomePage}>
      <Headline />
      <MainGraph />
      <WorkBlocksProvider>
        <WorkContainer />
        <RegisterWorkContainer />
      </WorkBlocksProvider>
    </div>
  );
};

export default DesktopHomePage;
