import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import BtnCreateWork from '../btnCreateWork/BtnCreateWork';
import S from './RegisterWorkContainer.style';
import { BTN_SELECT_CHIP_STATUSES } from '@/types/btnSelectChip.type';
import type {
  MyCropResponse,
  RecommendedWorksResponse,
} from '@/types/openapiGenerator';
import ToolTip from '@/components/toolTip/ToolTip';
import { TOOLTIP_DIRECTIONS, TOOLTIP_TYPES } from '@/types/tooltip.type';
import { IC24InfoIcon } from '@/assets/icons/flat';
import useVisibility from '@/hooks/useVisibility';

interface RegisterWorkContainerProps {
  recommendedWorks: RecommendedWorksResponse[];
  myCrops: MyCropResponse[];
  selectedCrop?: MyCropResponse | null;
  handleCropClick: (crop: MyCropResponse) => void;
  handleCreateWork: (
    work: RecommendedWorksResponse,
    crop: MyCropResponse
  ) => void;
  setSelectedRecommendedWork: (work: RecommendedWorksResponse | null) => void;
}

const RegisterWorkContainer = ({
  recommendedWorks,
  myCrops,
  selectedCrop,
  handleCropClick,
  handleCreateWork,
  setSelectedRecommendedWork,
}: RegisterWorkContainerProps) => {
  const { isVisible, show, hide } = useVisibility();

  return (
    <div css={S.RegisterWorkContainer}>
      <div css={S.TextBox}>
        <div css={S.TextBoxTitle}>작업 일정 추천하기 </div>
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
          <div css={S.IconContainer} onMouseEnter={show} onMouseLeave={hide}>
            <IC24InfoIcon width={24} height={24} />
            {isVisible && (
              <ToolTip
                direction={TOOLTIP_DIRECTIONS.RIGHT}
                content={
                  <div>
                    작물을 선택하고 추천 작업 일정을 드래그하여 추가할 수
                    있습니다.
                  </div>
                }
                type={TOOLTIP_TYPES.DEFAULT}
              />
            )}
          </div>
        </div>
        <div css={S.BtnCreateWorkContainer}>
          {recommendedWorks.map(work => (
            <BtnCreateWork
              key={work.workId}
              work={work}
              setSelectedRecommendedWork={setSelectedRecommendedWork}
              onClick={() => handleCreateWork(work, selectedCrop!)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterWorkContainer;
