import { css } from '@emotion/react';
import { useState } from 'react';
import { Assets, GrayScale } from '@/styles/colors';
import { Spacing } from '@/styles/spacing';
import convertHexToRGBA from '@/utils/converHexToRGBA';
import { borderStyles } from '@/styles/borderStyles';
import { Typography, TypographyBold } from '@/styles/typography';
import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import BtnCreateWork from '../btnCreateWork/BtnCreateWork';

const RegisterWorkContainer = () => {
  const fruits = ['포도', '사과', '바나나', '딸기'];
  const [selectedFruit, setSelectedFruit] = useState(0); // 첫 번째(포도)가 기본 선택

  const handleFruitClick = (index: number) => {
    setSelectedFruit(index);
  };

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
        margin-top: ${Spacing.Spacing600};
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
            ${TypographyBold.Subtitle}
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
          flex-direction: column;
          gap: ${Spacing.Spacing500};
          padding-right: ${Spacing.Spacing800};
          height: 88px;
          width: 644px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: ${Spacing.Spacing300};
          `}
        >
          {fruits.map((fruit, index) => (
            <BtnSelectChip
              key={fruit}
              size="Small"
              text={fruit}
              status={selectedFruit === index ? 'Pressed' : 'Default'}
              onClick={() => handleFruitClick(index)}
            />
          ))}
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            gap: ${Spacing.Spacing300};
            height: 52px;
          `}
        >
          <BtnCreateWork text="농작업" />
          <BtnCreateWork text="농작업" />
          <BtnCreateWork text="농작업" disabled={true} />
        </div>
      </div>
    </div>
  );
};

export default RegisterWorkContainer;
