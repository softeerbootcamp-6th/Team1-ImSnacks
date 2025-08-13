import { useState } from 'react';
import dayjs from 'dayjs';
import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import BtnCreateWork from '../btnCreateWork/BtnCreateWork';
import S from './RegisterWorkContainer.style';
import { CROPS } from '@/constants/crops';
import type { WorkBlockType } from '@/types/workCard.type';
import useWorkBlocks from '@/contexts/useWorkBlocks';
import { calculateTimeToPosition } from '../../utils/getInitialWorkBlocks';
import { BTN_SELECT_CHIP_STATUSES } from '@/types/btnSelectChip.type';

const RegisterWorkContainer = () => {
  const crops = CROPS;

  const [selectedCrop, setSelectedCrop] = useState<{
    id: number;
    name: string;
  }>(crops[0]);

  const { addWorkBlock } = useWorkBlocks();

  const handleCropClick = (crop: { id: number; name: string }) => {
    setSelectedCrop(crop);
  };

  const handleCreateWork = (workName: string) => {
    const { x, width } = calculateTimeToPosition(
      dayjs().hour(9).minute(0).toISOString(),
      dayjs().hour(10).minute(0).toISOString()
    );

    const newWorkBlock: WorkBlockType = {
      id: Date.now(),
      position: { x, y: 40 },
      size: { width, height: 50 },
      cropName: selectedCrop?.name || '기본',
      workName: workName,
      workTime: '09:00 - 10:00',
      startTime: dayjs().hour(9).minute(0).toISOString(),
      endTime: dayjs().hour(10).minute(0).toISOString(),
    };
    addWorkBlock(newWorkBlock);
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
          {crops.map(crop => (
            <BtnSelectChip
              key={crop.id}
              size="Small"
              text={crop.name}
              status={
                selectedCrop.id === crop.id
                  ? BTN_SELECT_CHIP_STATUSES.PRESSED
                  : BTN_SELECT_CHIP_STATUSES.DEFAULT
              }
              onClick={() => handleCropClick(crop)}
            />
          ))}
        </div>
        <div css={S.BtnCreateWorkContainer}>
          <BtnCreateWork
            text="농작업"
            onClick={() => handleCreateWork('농작업')}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterWorkContainer;
