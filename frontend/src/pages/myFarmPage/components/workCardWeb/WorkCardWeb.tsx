import { Assets, ColorStatus, GrayScale } from '@/styles/colors';
import { BorderRadius } from '@/styles/borderRadius';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import { Typography } from '@/styles/typography';
import WorkChip from '../workChip/WorkChip';
import { WORK_CHIP_STATUSES, WORK_CHIP_TYPES } from '@/types/workCardWeb.type';
import { CROP_NAME } from '@/constants/cropName';

interface WorkCardWebProps {
  cropName: string;
  workName: string;
  workTime: string;
  isCompleted: boolean;
}

const WorkCardWeb = ({
  cropName,
  workName,
  workTime,
  isCompleted,
}: WorkCardWebProps) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: ${Spacing.Spacing300};
        padding: ${Spacing.Spacing200} ${Spacing.Spacing300};
        border-radius: ${BorderRadius.Base.S_Hard};
        background-color: ${GrayScale.White};
        border: 1px solid ${GrayScale.G200};
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: ${Spacing.Spacing300};
        `}
      >
        <div
          css={css`
            width: 4px;
            height: 76px;
            background-color: ${ColorStatus.Crops[
              CROP_NAME[
                cropName as keyof typeof CROP_NAME
              ] as keyof typeof ColorStatus.Crops
            ]};
            border-radius: ${BorderRadius.Base.Hard};
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: ${Spacing.Spacing100};
          `}
        >
          <div
            css={css`
              ${Typography.Body_L_500}
              color: ${Assets.Text.WorkCard.Default.Headline};
            `}
          >
            {workName}
          </div>
          <div
            css={css`
              ${Typography.Body_S_400}
              color: ${Assets.Text.WorkCard.Default.Headline};
            `}
          >
            {cropName}
          </div>
          <div
            css={css`
              ${Typography.Caption_S}
              color: ${Assets.Text.WorkCard.Default.Body};
            `}
          >
            {workTime}
          </div>
        </div>
      </div>
      <WorkChip
        chipType={
          isCompleted ? WORK_CHIP_TYPES.COMPLETE : WORK_CHIP_TYPES.INCOMPLETE
        }
        status={WORK_CHIP_STATUSES.DEFAULT}
      />
    </div>
  );
};

export default WorkCardWeb;
