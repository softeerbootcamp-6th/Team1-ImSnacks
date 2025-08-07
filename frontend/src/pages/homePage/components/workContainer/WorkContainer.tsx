import React, { useState } from 'react';
import { css } from '@emotion/react';
import WorkCells from './WorkCells';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import { useInitialWorkBlocks } from '@/pages/homePage/hooks/useInitialWorkBlocks';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';

const WorkContainer = () => {
  const [workBlocks, setWorkBlocks] = useState(useInitialWorkBlocks());

  const {
    containerRef,
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isItemDragging,
  } = useDragAndDrop({
    items: workBlocks,
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: updatedBlocks => {
      setWorkBlocks(updatedBlocks);
    },
  });

  // 드래그 중 workTime 업데이트
  const updateBlockWorkTime = (block: WorkBlockType) => {
    // x 위치를 시간으로 변환 (100px = 1시간)
    const newStartHour = Math.round(block.position.x / 100);
    const newStartMinutes = Math.round((block.position.x % 100) * 0.6); // 100px = 60분

    // 기존 작업 시간 길이 유지
    const originalStartTime = dayjs(block.startTime);
    const originalEndTime = dayjs(block.endTime);
    const durationMinutes = originalEndTime.diff(originalStartTime, 'minute');

    // 새로운 시작 시간 계산 (x 위치 기반)
    const newStartTime = dayjs().hour(newStartHour).minute(newStartMinutes);
    const newEndTime = newStartTime.add(durationMinutes, 'minute');
    console.log(
      'updateWorkTime',
      originalStartTime.toISOString(),
      originalEndTime.toISOString(),
      newStartTime.toISOString(),
      newEndTime.toISOString()
    );

    return {
      ...block,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString(),
      workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
        'HH:mm'
      )}`,
    };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={e => {
        updatePosition(e, block => updateBlockWorkTime(block));
      }}
      onMouseUp={() => {
        endDrag();
      }}
      onMouseLeave={endDrag}
      css={css`
        width: 100%;
        overflow-x: auto;
        overflow-y: hidden;
        position: relative;

        &::-webkit-scrollbar {
          height: 8px;
        }

        &::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background: ${GrayScale.G50};
          border-radius: 4px;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: center;
          min-width: max-content;
          padding: 16px 0;
          position: relative;
        `}
      >
        <WorkCells isDragging={isDragging} />

        {workBlocks.map(block => (
          <>
            <WorkCardRegister
              key={block.id}
              id={block.id}
              cropName={block.cropName}
              workName={block.workName}
              workTime={block.workTime}
              isDragging={isItemDragging(block.id)}
              width={block.width}
              x={block.position.x}
              y={block.position.y}
              onMouseDown={e => {
                startDrag(e, block.id);
              }}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default WorkContainer;
