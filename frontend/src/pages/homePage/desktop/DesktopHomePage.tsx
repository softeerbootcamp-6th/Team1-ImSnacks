import WorkBlocksProvider from '@/pages/homePage/contexts/WorksProvider';
import Headline from '../components/headline/Headline';
import S from './DesktopHomePage.style';
import WorkContainer from '../components/workContainer/WorkContainer';
import RegisterWorkContainer from '../components/registerWorkContainer/RegisterWorkContainer';
import DamagePests from '../components/damagePests/DamagePests';

const DesktopHomePage = () => {
  return (
    <div css={S.DesktopHomePage}>
      <Headline />
      <WorkBlocksProvider>
        <WorkContainer />
        <RegisterWorkContainer />
      </WorkBlocksProvider>
      <DamagePests />
    </div>
  );
};

export default DesktopHomePage;
