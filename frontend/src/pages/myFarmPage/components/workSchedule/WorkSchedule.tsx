import { css } from '@emotion/react';
import MyFarmHeader from '../myFarmHeader/MyFarmHeader';
import { Spacing } from '@/styles/spacing';
import { BorderRadius } from '@/styles/borderRadius';
import { customBorderGradientStyles } from '@/styles/customBorderGradientStyles';
import { GrayScale, Opacity } from '@/styles/colors';
import { Typography } from '@/styles/typography';

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
          height: 770px;
          gap: ${Spacing.Spacing100};
          border-radius: ${BorderRadius.Base.S_Hard};
          ${customBorderGradientStyles.gradientBorder}
          padding: ${Spacing.Spacing300};
          background-color: ${Opacity.White.W100};
        `}
      >
        <div
          css={css`
            color: ${GrayScale.White};
            ${Typography.Body_L_500}
            padding: 0 ${Spacing.Spacing100} ${Spacing.Spacing100} 0;
          `}
        >
          2025년 8월
        </div>
      </div>
    </div>
  );
};

export default WorkSchedule;
