import React, { useState } from 'react';
import { css } from '@emotion/react';
import WorkCells from './WorkCells';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import { useInitialWorkBlocks } from '@/pages/homePage/hooks/useInitialWorkBlocks';
import { useDragAndDrop } from '@/hooks/dnd/useDragAndDrop';
import useRemoveOnOutOfBounds from '@/hooks/dnd/useRemoveOnOutOfBounds';
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
    getDraggingItem,
  } = useDragAndDrop<WorkBlockType>({
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: updated => setWorkBlocks(updated),
  });

  // 드래그 중인 아이템 id를 가져오는 함수
  const getDraggingId = () => {
    // isItemDragging은 특정 id가 드래그 중인지 알려주므로,
    // workBlocks에서 드래그 중인 id를 찾아 반환
    const draggingBlock = workBlocks.find(block => isItemDragging(block.id));
    return draggingBlock ? draggingBlock.id : null;
  };

  const { checkAndRemove } = useRemoveOnOutOfBounds<WorkBlockType>({
    containerRef: containerRef as React.RefObject<HTMLElement>,
    items: workBlocks,
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    getItemWidth: block => block.width,
    onRemove: id => setWorkBlocks(blocks => blocks.filter(b => b.id !== id)),
  });

  const handleEndDrag = () => {
    const draggingId = getDraggingId();
    if (draggingId !== null) {
      checkAndRemove(draggingId);
    }
    endDrag();
  };

  const updateBlockWorkTime = (
    block: WorkBlockType,
    position: { x: number; y: number }
  ) => {
    const newStartHour = Math.round(position.x / 100);
    const newStartMinutes = Math.round((position.x % 100) * 0.6);

    const originalStartTime = dayjs(block.startTime);
    const originalEndTime = dayjs(block.endTime);
    const durationMinutes = originalEndTime.diff(originalStartTime, 'minute');

    const newStartTime = dayjs().hour(newStartHour).minute(newStartMinutes);
    const newEndTime = newStartTime.add(durationMinutes, 'minute');

    return {
      ...block,
      position,
      startTime: newStartTime.toISOString(),
      endTime: newEndTime.toISOString(),
      workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
        'HH:mm'
      )}`,
    };
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={e => {
          updatePosition(e, (block, pos) => updateBlockWorkTime(block, pos));
        }}
        onMouseUp={handleEndDrag}
        onMouseLeave={handleEndDrag}
        css={css`
          width: 100%;
        `}
      >
        {(() => {
          const draggingItem = getDraggingItem(workBlocks);
          return (
            isDragging &&
            draggingItem && (
              <WorkCardRegister
                key={draggingItem.id}
                id={draggingItem.id}
                cropName={draggingItem.cropName}
                workName={draggingItem.workName}
                workTime={draggingItem.workTime}
                isDragging={isDragging}
                width={draggingItem.width}
                x={draggingItem.position.x}
                y={draggingItem.position.y}
                onMouseDown={e => {
                  startDrag(e, draggingItem.id, workBlocks);
                }}
              />
            )
          );
        })()}

        <div
          css={css`
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
          {workBlocks.map(block => (
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
                startDrag(e, block.id, workBlocks);
              }}
            />
          ))}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkContainer;
