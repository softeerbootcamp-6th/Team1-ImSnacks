import { Spacing } from '@/styles/spacing';
import { FlexStyles } from '@/styles/commonStyles';
import { css } from '@emotion/react';
import S from './WorkCardRegister.style';
import type { CropNameType } from '@/types/crop.type';
import useVisibility from '@/hooks/useVisibility';
import { useCallback, useRef, useState } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import dayjs from 'dayjs';
import { calculateTimeToPosition } from '../../utils/getInitialWorkBlocks';

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
  const resizeRef = useRef<{
    startX: number;
    startTime: dayjs.Dayjs;
    endTime: dayjs.Dayjs;
    direction: 'left' | 'right';
  } | null>(null);

  const [newWidth, setNewWidth] = useState(block.width);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, direction: 'left' | 'right') => {
      e.stopPropagation();

      if (!onResize || !block.width) return;

      const startTime = dayjs(block.startTime);
      const endTime = dayjs(block.endTime);

      resizeRef.current = {
        startX: e.clientX,
        startTime,
        endTime,
        direction,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!resizeRef.current) return;

        const { startX, startTime, endTime, direction } = resizeRef.current;
        const deltaX = moveEvent.clientX - startX;

        // 100px = 1시간 (60분)
        const minutesPerPixel = 60 / 100;
        const deltaMinutes = deltaX * minutesPerPixel;

        let newStartTime = startTime;
        let newEndTime = endTime;

        if (direction === 'left') {
          // 왼쪽 핸들: 시작 시간 변경
          newStartTime = startTime.add(deltaMinutes, 'minute');
        } else {
          // 오른쪽 핸들: 종료 시간 변경
          newEndTime = endTime.add(deltaMinutes, 'minute');
        }

        // 최소 30분 이상 유지
        const durationMinutes = newEndTime.diff(newStartTime, 'minute');
        if (durationMinutes < 30) return;

        const { x: newX, width: newWidth } = calculateTimeToPosition(
          newStartTime.toISOString(),
          newEndTime.toISOString()
        );

        setNewWidth(newWidth);

        onResize({
          ...block,
          position: {
            x: newX,
            y: block.position.y,
          },
          startTime: newStartTime.toISOString(),
          endTime: newEndTime.toISOString(),
          workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
            'HH:mm'
          )}`,
          width: newWidth,
        });
      };

      const handleMouseUp = () => {
        resizeRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [onResize, block]
  );

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
          onMouseDown={e => handleResizeStart(e, 'left')}
        />
      )}

      {/* 오른쪽 리사이징 핸들 */}
      {!isDragging && onResize && (
        <div
          css={S.WorkCardResizeHandleRight}
          onMouseDown={e => handleResizeStart(e, 'right')}
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
        {isVisible && !isDragging && (
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
