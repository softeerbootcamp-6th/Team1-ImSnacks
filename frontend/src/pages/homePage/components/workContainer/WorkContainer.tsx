import React, { useState } from 'react';
import { css } from '@emotion/react';
import WorkCells from './WorkCells';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import { useInitialWorkBlocks } from '@/pages/homePage/hooks/useInitialWorkBlocks';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

const WorkContainer = () => {
  const [workBlocks, setWorkBlocks] = useState(useInitialWorkBlocks());

  const {
    containerRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isItemDragging,
  } = useDragAndDrop({
    items: workBlocks,
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: setWorkBlocks,
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
            onMouseDown={e => handleMouseDown(e, block.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkContainer;
