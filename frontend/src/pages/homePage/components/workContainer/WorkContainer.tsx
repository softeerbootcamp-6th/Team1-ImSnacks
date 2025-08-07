import React, { useState, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import WorkCells from './WorkCells';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import { useInitialWorkBlocks } from '@/pages/homePage/hooks/useInitialWorkBlocks';

const WorkContainer = () => {
  const [workBlocks, setWorkBlocks] = useState(useInitialWorkBlocks());

  const [draggedBlock, setDraggedBlock] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, blockId: number) => {
      const block = workBlocks.find(b => b.id === blockId);
      if (!block || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - block.position.x;
      const offsetY = e.clientY - rect.top - block.position.y;

      setDragOffset({ x: offsetX, y: offsetY });
      setDraggedBlock(blockId);
      setIsDragging(true);
    },
    [workBlocks]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggedBlock === null || !containerRef.current) return;

      requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const newX = e.clientX - rect.left - dragOffset.x;
        const newY = e.clientY - rect.top - dragOffset.y;

        setWorkBlocks(prev =>
          prev.map(block =>
            block.id === draggedBlock
              ? { ...block, position: { x: newX, y: newY } }
              : block
          )
        );
      });
    },
    [draggedBlock, dragOffset]
  );

  const handleMouseUp = useCallback(() => {
    setDraggedBlock(null);
    setIsDragging(false);
  }, []);

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
            isDragging={draggedBlock === block.id}
            width={block.width}
            style={{
              transform: `translate(${block.position.x}px, ${block.position.y}px)`,
            }}
            onMouseDown={e => handleMouseDown(e, block.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkContainer;
