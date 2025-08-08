import React, { useState } from 'react';
import { css } from '@emotion/react';
import WorkCells from './WorkCells';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import getInitialWorkBlocks from '@/pages/homePage/utils/getInitialWorkBlocks';
import { useDragAndDrop } from '@/hooks/dnd/useDragAndDrop';
import useRemoveOnOutOfBound from '@/hooks/dnd/useRemoveOnOutOfBound';
import type { WorkBlockType } from '@/types/workCard.type';
import updateBlockWorkTime from '@/pages/homePage/utils/updateBlockWorkTime';

const WorkContainer = () => {
  const [workBlocks, setWorkBlocks] = useState(getInitialWorkBlocks());

  const {
    containerRef,
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isItemDragging,
    currentDraggingItem,
  } = useDragAndDrop<WorkBlockType>({
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: updated => setWorkBlocks(updated),
  });

  const { checkAndRemove } = useRemoveOnOutOfBound<WorkBlockType>({
    containerRef: containerRef as React.RefObject<HTMLElement>,
    items: workBlocks,
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    getItemWidth: block => block.width,
    onRemove: id => setWorkBlocks(blocks => blocks.filter(b => b.id !== id)),
  });

  const handleEndDrag = () => {
    const draggingId = currentDraggingItem?.id;
    if (draggingId !== null && draggingId !== undefined) {
      checkAndRemove(draggingId);
    }
    endDrag();
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
        {isDragging && currentDraggingItem && (
          <WorkCardRegister
            key={currentDraggingItem.id}
            id={currentDraggingItem.id}
            cropName={currentDraggingItem.cropName}
            workName={currentDraggingItem.workName}
            workTime={currentDraggingItem.workTime}
            isDragging={isDragging}
            width={currentDraggingItem.width}
            x={currentDraggingItem.position.x}
            y={currentDraggingItem.position.y}
            onMouseDown={e => {
              startDrag(e, currentDraggingItem.id, workBlocks);
            }}
          />
        )}

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
