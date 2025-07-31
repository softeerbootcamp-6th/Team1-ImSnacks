import { BorderRadius } from '@/styles/borderRadius';
import { borderStyles } from '@/styles/borderStyles';
import { Assets, GrayScale, Opacity } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import { css } from '@emotion/react';
import type { CropInfoCardType } from '@/types/cropInfoCard.type';
import { Typography } from '@/styles/typography';

const CropInfoCard = ({ crop }: { crop: CropInfoCardType }) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 314px;
        height: 192px;
        border-radius: ${BorderRadius.Base.Hard};
        ${borderStyles.gradientBorder}
        background-color: ${Opacity.White.W100};
        padding: ${Spacing.Spacing500};
        gap: ${Spacing.Spacing300};
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
          gap: ${Spacing.Spacing600};
        `}
      >
        <div
          css={css`
            width: 100px;
            height: 100px;
            border-radius: ${BorderRadius.Base.Hard};
            background-color: ${GrayScale.White};
          `}
        ></div>
        <div
          css={css`
            width: 162px;
            height: 64px;
            gap: ${Spacing.Spacing200};
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
          `}
        >
          <div
            css={css`
              ${Typography.Body_L_700}
              color: ${Assets.Text.CropInfoCard.Headline};
            `}
          >
            {crop.name}
          </div>
          <div>{crop.lifeCycle}</div>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-end;
          width: 100%;
          gap: ${Spacing.Spacing200};
        `}
      >
        <div
          css={css`
            ${Typography.Caption_S}
            color: ${Assets.Text.CropInfoCard.Body};
          `}
        >
          발아일로부터
        </div>
        <div
          css={css`
            ${Typography.Subtitle_700}
            color: ${Assets.Text.CropInfoCard.Headline};
          `}
        >
          +{crop.date}일
        </div>
      </div>
    </div>
  );
};

export default CropInfoCard;
