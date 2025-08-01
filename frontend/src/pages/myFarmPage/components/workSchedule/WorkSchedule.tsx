import { css } from '@emotion/react';
import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import { Spacing } from '@/styles/spacing';
import { BorderRadius } from '@/styles/borderRadius';
import { borderStyles } from '@/styles/borderStyles';
import { Opacity } from '@/styles/colors';

const WorkSchedule = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <MyFarmHeader title="작업 이력" />
      <div
        css={css`
          width: 1328px;
          height: 770px;
          gap: ${Spacing.Spacing100};
          border-radius: ${BorderRadius.Base.S_Hard};
          ${borderStyles.gradientBorder}
          padding: ${Spacing.Spacing300};
          background-color: ${Opacity.White.W100};
        `}
      ></div>
    </div>
  );
};

export default WorkSchedule;
