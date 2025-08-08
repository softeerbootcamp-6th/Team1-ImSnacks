import { css } from '@emotion/react';
import { Spacing } from '@/styles/spacing';
import MyCropInfo from './components/myCropInfo/MyCropInfo';
import WorkSchedule from './components/workSchedule/WorkSchedule';

const MyFarmPage = () => {
  return (
    <div
      css={css`
        display: flex;
        padding: ${Spacing.Spacing1100} 0;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          padding: ${Spacing.Spacing1100} 0;
          gap: ${Spacing.Spacing1100};
          display: flex;
          flex-direction: column;
          justify-content: center;
        `}
      >
        <MyCropInfo />
        <WorkSchedule />
      </div>
    </div>
  );
};

export default MyFarmPage;
