import { Spacing } from '@/styles/spacing';
import { FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';
import S from './WorkCardRegister.style';
import type { CropNameType } from '@/types/crop.type';
import useVisibility from '@/hooks/useVisibility';
import { useState } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import { useResize } from '@/pages/homePage/hooks/useResize';

interface WorkCardRegisterProps {
  isDragging?: boolean;
  block: WorkBlockType;
  onMouseDown?: (e: React.MouseEvent) => void;
  onDelete?: () => void;
  onResize?: (newBlock: WorkBlockType) => void;
}

const WorkCardRegister = ({
  isDragging = false,
  block,
  onMouseDown,
  onDelete,
  onResize,
}: WorkCardRegisterProps) => {
  const { show, hide, isVisible } = useVisibility();
  const [newWidth, setNewWidth] = useState(block.width);
  const [isResizing, setIsResizing] = useState(false);

  const { handleResizeStart } = useResize({
    onResize: newBlock => {
      setNewWidth(newBlock.width);
      setIsResizing(true);
      onResize?.(newBlock);
    },
  });

  return (
    <div
      css={S.WorkCardContainer({ isDragging, width: newWidth })}
      onMouseDown={onMouseDown}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      {/* 왼쪽 리사이징 핸들 */}
      {!isDragging && onResize && (
        <div
          css={S.WorkCardResizeHandleLeft}
          onMouseDown={e => handleResizeStart(e, block, 'left')}
          onMouseUp={() => setIsResizing(false)}
        />
      )}

      {/* 오른쪽 리사이징 핸들 */}
      {!isDragging && onResize && (
        <div
          css={S.WorkCardResizeHandleRight}
          onMouseDown={e => handleResizeStart(e, block, 'right')}
          onMouseUp={() => setIsResizing(false)}
        />
      )}

      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div css={S.WorkCardContent}>
          <div css={S.WorkCardColorBar(block.cropName as CropNameType)} />
          <div css={S.WorkCardInfo}>
            <div
              css={css`
                ${FlexStyles.flexRow} gap:${Spacing.Spacing300}
              `}
            >
              <div css={S.WorkCardTitle}>{block.workName}</div>
              <div css={S.WorkCardCropName}> {block.cropName}</div>
            </div>
            <div css={S.WorkCardTime}>{block.workTime}</div>
          </div>
        </div>
        {isVisible && !isResizing && !isDragging && (
          <button
            onClick={onDelete}
            onMouseDown={e => e.stopPropagation()}
            css={S.WorkCardDeleteButton}
          >
            삭제
          </button>
        )}
      </div>
    </div>
  );
};

export default WorkCardRegister;
