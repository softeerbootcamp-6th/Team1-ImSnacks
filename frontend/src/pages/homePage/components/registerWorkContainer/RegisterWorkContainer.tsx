import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import BtnCreateWork from '../btnCreateWork/BtnCreateWork';
import S from './RegisterWorkContainer.style';
import { BTN_SELECT_CHIP_STATUSES } from '@/types/btnSelectChip.type';
import { useRecommendedWorks } from '../../hooks/useRecommendedWorks';
import { useCreateWorkBlock } from '../../hooks/useCreateWorkBlock';

const RegisterWorkContainer = () => {
  const { recommendedWorks, myCrops, selectedCrop, handleCropClick } =
    useRecommendedWorks();

  const { handleCreateWork } = useCreateWorkBlock();

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
          {!myCrops.length && <div>작물을 추가해주세요.</div>}
          {myCrops.map(crop => (
            <BtnSelectChip
              key={crop.myCropId}
              size="Small"
              text={crop.myCropName || ''}
              status={
                selectedCrop?.myCropId === crop.myCropId
                  ? BTN_SELECT_CHIP_STATUSES.PRESSED
                  : BTN_SELECT_CHIP_STATUSES.DEFAULT
              }
              onClick={() => handleCropClick(crop)}
            />
          ))}
        </div>
        <div css={S.BtnCreateWorkContainer}>
          {recommendedWorks.map(work => (
            <BtnCreateWork
              key={work.workId}
              work={work}
              onClick={() => handleCreateWork(work, selectedCrop!)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterWorkContainer;
