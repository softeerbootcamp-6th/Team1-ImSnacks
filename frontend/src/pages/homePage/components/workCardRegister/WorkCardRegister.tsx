import S from './WorkCardRegister.style';
import WorkCardRegisterContent from '../workCardRegisterContent/WorkCardRegisterContent';
import useVisibility from '@/hooks/useVisibility';
import { useState } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import { useChangeTimeByResize } from '@/pages/homePage/hooks/useChangeTimeByResize';
import { css } from '@emotion/react';
import { useResizeCollision } from '@/hooks/useResizeCollision';

interface WorkCardRegisterProps {
  isDragging?: boolean;
  block: WorkBlockType;
  onMouseDown?: (e: React.MouseEvent) => void;
  onDelete?: () => void;
  onResize?: (newBlock: WorkBlockType) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  scrollOffset?: number;
  allBlocks?: WorkBlockType[];
  updateWorkBlocks?: (blocks: WorkBlockType[]) => void;
}

const WorkCardRegister = ({
  isDragging = false,
  block,
  onMouseDown,
  onDelete,
  onResize,
  containerRef,
  scrollOffset = 0,
  allBlocks = [],
  updateWorkBlocks,
}: WorkCardRegisterProps) => {
  const { show, hide, isVisible } = useVisibility();
  const [newWidth, setNewWidth] = useState(block.size.width);
  const [isResizing, setIsResizing] = useState(false);

  const { handleResizeCollision } = useResizeCollision({
    containerRef,
    scrollOffset,
    allBlocks,
    updateWorkBlocks: updateWorkBlocks || (() => {}),
  });

  const { handleResizeStart } = useChangeTimeByResize({
    onResize: newBlock => {
      setNewWidth(newBlock.size.width);
      setIsResizing(true);
      onResize?.(newBlock);
    },
  });

  // 리사이징 후 충돌 검사 및 위치 조정
  const handleResizeEnd = () => {
    setIsResizing(false);
    handleResizeCollision(block, newWidth);
  };

  return (
    <div
      css={S.WorkCardContainer({
        isDragging,
        size: {
          width: newWidth,
          height: block.size.height,
        },
      })}
      onMouseDown={onMouseDown}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* 왼쪽 리사이징 핸들 */}
      {!isDragging && onResize && (
        <div
          css={S.WorkCardResizeHandleLeft}
          onMouseDown={e => handleResizeStart(e, block, 'left')}
          onMouseUp={handleResizeEnd}
        />
      )}

      {/* 오른쪽 리사이징 핸들 */}
      {!isDragging && onResize && (
        <div
          css={S.WorkCardResizeHandleRight}
          onMouseDown={e => handleResizeStart(e, block, 'right')}
          onMouseUp={handleResizeEnd}
        />
      )}

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <WorkCardRegisterContent
          width={newWidth}
          cropName={block.cropName}
          workName={block.workName}
          workTime={block.workTime}
        />
        {isVisible && !isResizing && !isDragging && (
          <button
            onClick={onDelete}
            onMouseDown={e => e.stopPropagation()}
            css={S.WorkCardDeleteButton}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkCardRegister;
