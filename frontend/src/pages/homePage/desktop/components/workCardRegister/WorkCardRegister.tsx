import S from './WorkCardRegister.style';
import WorkCardRegisterContent from '../../../components/workCardRegisterContent/WorkCardRegisterContent';
import useVisibility from '@/hooks/useVisibility';
import { useEffect, useState } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import { css } from '@emotion/react';

interface WorkCardRegisterProps {
  isDragging?: boolean;
  block: WorkBlockType;
  resizingBlock?: WorkBlockType | null;
  onMouseDown?: (e: React.MouseEvent) => void;
  onDelete?: () => void;
  handleResizeStart?: (
    e: React.PointerEvent,
    block: WorkBlockType,
    direction: 'left' | 'right'
  ) => void;
  handleResizeEnd?: () => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  scrollOffset?: number;
  allBlocks?: WorkBlockType[];
  updateWorkBlocks?: (blocks: WorkBlockType[]) => void;
}

const WorkCardRegister = ({
  isDragging = false,
  block,
  resizingBlock,
  onMouseDown,
  onDelete,
  handleResizeStart,
  handleResizeEnd,
}: WorkCardRegisterProps) => {
  const { show, hide, isVisible } = useVisibility();
  const [newWidth, setNewWidth] = useState(block.size.width);
  const [isResizing, setIsResizing] = useState(false);
  const [isToolTipVisible, setIsToolTipVisible] = useState(false);
  const [isPassedTime, setIsPassedTime] = useState(block.position.x < 0);

  // block이 변경될 때 newWidth 업데이트
  useEffect(() => {
    setNewWidth(block.size.width);
  }, [block.size.width]);

  // resizingBlock이 변경될 때도 newWidth 업데이트
  useEffect(() => {
    if (block.id === resizingBlock?.id) {
      setNewWidth(resizingBlock.size.width);
      setIsResizing(true);
    } else {
      setIsResizing(false);
    }
  }, [block.id, resizingBlock?.id, resizingBlock?.size.width]);

  useEffect(() => {
    setIsToolTipVisible(
      !isDragging &&
        !isResizing &&
        isVisible &&
        (isPassedTime ? newWidth + block.position.x : newWidth) < 145
    );
    setIsPassedTime(block.position.x < 0);
  }, [
    isVisible,
    isDragging,
    isResizing,
    newWidth,
    isPassedTime,
    block.position.x,
  ]);

  return (
    <>
      <div
        css={S.WorkCardContainer(
          {
            width: newWidth,
            height: block.size.height,
          },
          isResizing
        )}
        onMouseDown={onMouseDown}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {/* 왼쪽 리사이징 핸들 */}
        {!isDragging && (
          <div
            css={S.WorkCardResizeHandleLeft(isResizing)}
            onPointerDown={e => {
              e.stopPropagation();
              e.preventDefault();
              setIsResizing(true);
              handleResizeStart?.(e, block, 'left');
            }}
            onPointerUp={() => {
              setIsResizing(false);
              handleResizeEnd?.();
            }}
          />
        )}

        {/* 오른쪽 리사이징 핸들 */}
        {!isDragging && (
          <div
            css={S.WorkCardResizeHandleRight(isResizing)}
            onPointerDown={e => {
              e.stopPropagation();
              e.preventDefault();
              setIsResizing(true);
              handleResizeStart?.(e, block, 'right');
            }}
            onPointerUp={() => {
              setIsResizing(false);
              handleResizeEnd?.();
            }}
          />
        )}

        <div
          css={css`
            margin-left: ${isPassedTime && !isDragging
              ? -block.position.x
              : 0}px;
          `}
        >
          <WorkCardRegisterContent
            width={
              isPassedTime && !isDragging
                ? newWidth + block.position.x
                : newWidth
            }
            cropName={block.cropName}
            workName={block.workName}
            workTime={block.workTime}
            isToolTipVisible={isToolTipVisible}
          />
        </div>

        {isVisible && !isResizing && !isDragging && (
          <button
            onClick={onDelete}
            onPointerDown={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
            css={S.WorkCardDeleteButton}
          >
            ×
          </button>
        )}
      </div>
    </>
  );
};

export default WorkCardRegister;
