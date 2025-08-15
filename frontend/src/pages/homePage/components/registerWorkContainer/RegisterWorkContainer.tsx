import { useState } from 'react';
import dayjs from 'dayjs';
import BtnSelectChip from '../btnSelectChip/BtnSelectChip';
import BtnCreateWork from '../btnCreateWork/BtnCreateWork';
import S from './RegisterWorkContainer.style';
import { CROPS } from '@/constants/crops';
import type { WorkBlockType } from '@/types/workCard.type';
import useWorkBlocks from '@/contexts/useWorkBlocks';
import calculateTimeToPosition from '../../utils/calculateTimeToPosition';
import { BTN_SELECT_CHIP_STATUSES } from '@/types/btnSelectChip.type';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import { findCollisionFreePosition } from '@/utils/collisionUtils';

const RegisterWorkContainer = () => {
  const crops = CROPS;

  const [selectedCrop, setSelectedCrop] = useState<{
    id: number;
    name: string;
  }>(crops[0]);

  const { addWorkBlock, workBlocks } = useWorkBlocks();

  const handleCropClick = (crop: { id: number; name: string }) => {
    setSelectedCrop(crop);
  };

  const handleCreateWork = (workName: string) => {
    const now = dayjs();
    const newStartTime = now.add(3, 'hour').minute(0);
    const newEndTime = now.add(5, 'hour').minute(0);
    const { x, width } = calculateTimeToPosition(
      newStartTime.toISOString(),
      newEndTime.toISOString()
    );

    // 임시 블록 생성하여 겹침 검사용으로 사용
    const tempBlock: WorkBlockType = {
      id: Date.now(),
      position: { x, y: getYCoordinate(1) },
      size: { width, height: 50 },
      cropName: selectedCrop?.name || '기본',
      workName: workName,
      workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
        'HH:mm'
      )}`,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString(),
    };

    // 기존 블록들과 겹치지 않는 새로운 포지션 찾기
    const containerRect = {
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
      toJSON: () => ({}),
    } as DOMRect;
    const scrollOffset = 0; // 스크롤 오프셋은 0으로 설정

    const collisionFreePosition = findCollisionFreePosition(
      tempBlock,
      workBlocks,
      containerRect,
      scrollOffset
    );

    const newWorkBlock: WorkBlockType = {
      ...tempBlock,
      position: collisionFreePosition,
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
