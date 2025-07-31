import { useState } from 'react';
import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import BtnCreateWork from '../btnCreateWork/BtnCreateWork';
import S from './RegisterWorkContainer.style';

const RegisterWorkContainer = () => {
  const fruits = ['포도', '사과', '바나나', '딸기'];
  const [selectedFruit, setSelectedFruit] = useState(0); // 첫 번째가 기본 선택

  const handleFruitClick = (index: number) => {
    setSelectedFruit(index);
  };

  return (
    <div css={S.RegisterWorkContainer}>
      <div css={S.TextBox}>
        <div css={S.TextBoxTitle}>작업 일정 추천하기</div>
        <div css={S.TextBoxDescription}>
          과실이 크게 자라는 지금, 기상 상황에 따라 이런 작업을 추천 드려요!
        </div>
      </div>
      <div css={S.BtnBox}>
        <div css={S.BtnSelectChipContainer}>
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
        <div css={S.BtnCreateWorkContainer}>
          <BtnCreateWork text="농작업" />
          <BtnCreateWork text="농작업" />
        </div>
      </div>
    </div>
  );
};

export default RegisterWorkContainer;
