import MyCropInfo from './components/myCropInfo/MyCropInfo';
import WorkSchedule from './components/workSchedule/WorkSchedule';
import S from './MyFarmPage.style';

const MyFarmPage = () => {
  return (
    <div css={S.MyFarmPageWrapper}>
      <div css={S.MyFarmPageContentWrapper}>
        <MyCropInfo />
        <WorkSchedule />
      </div>
    </div>
  );
};

export default MyFarmPage;
