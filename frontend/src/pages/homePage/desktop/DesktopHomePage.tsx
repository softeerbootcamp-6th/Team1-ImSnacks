import WorkBlocksProvider from '@/contexts/WorkBlocksProvider';
import { ContainerRefProvider } from '@/contexts/ContainerRefProvider';
import Headline from '../components/headline/Headline';
import S from './DesktopHomePage.style';
import WorkContainer from '../components/workContainer/WorkContainer';
import RegisterWorkContainer from '../components/registerWorkContainer/RegisterWorkContainer';
import DamagePests from '../components/damagePests/DamagePests';

const DesktopHomePage = () => {
  return (
    <div css={S.DesktopHomePage}>
      <Headline />
      <ContainerRefProvider>
        <WorkBlocksProvider>
          <WorkContainer />
          <RegisterWorkContainer />
        </WorkBlocksProvider>
      </ContainerRefProvider>
      <DamagePests />
    </div>
  );
};

export default DesktopHomePage;
