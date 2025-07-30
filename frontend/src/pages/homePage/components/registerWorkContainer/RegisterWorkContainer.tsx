import { css } from '@emotion/react';
import { Assets, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import convertHexToRGBA from '@/utils/converHexToRGBA';
import { borderStyles } from '@/styles/borderStyles';
import { Typography } from '@/styles/typography';
import BtnSelectChip from '../btnSelectChip/BtnSelectChip';

const RegisterWorkContainer = () => {
  return (
    <div
      css={css`
        width: 1328px;
        height: 137px;
        border-radius: 16px;
        padding: ${Spacing.Spacing600} ${Spacing.Spacing800};
        background: ${convertHexToRGBA(GrayScale.White, 0.6)};
        ${borderStyles.gradientBorder}
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: ${Spacing.Spacing300};
        `}
      >
        <div
          css={css`
            ${Typography.Subtitle500}
            color: ${Assets.Text.Global.Headline};
          `}
        >
          작업 일정 추천하기
        </div>
        <div
          css={css`
            ${Typography.Body_S}
            color: ${Assets.Text.Global.Caption};
          `}
        >
          과실이 크게 자라는 지금, 기상 상황에 따라 이런 작업을 추천 드려요!
        </div>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: ${Spacing.Spacing300};
        `}
      >
        <BtnSelectChip
          size="Small"
          text="포도"
          status="Pressed"
          onClick={() => console.log('clicked')}
        />
        <BtnSelectChip
          size="Small"
          text="사과"
          status="Default"
          onClick={() => console.log('clicked')}
        />
        <BtnSelectChip
          size="Small"
          text="바나나"
          status="Hover"
          onClick={() => console.log('clicked')}
        />
        <BtnSelectChip
          size="Small"
          text="딸기"
          status="Disabled"
          disabled={true}
          onClick={() => console.log('clicked')}
        />
      </div>
    </div>
  );
};

export default RegisterWorkContainer;
