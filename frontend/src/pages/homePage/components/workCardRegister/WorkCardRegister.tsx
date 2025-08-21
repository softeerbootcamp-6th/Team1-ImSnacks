import S from './WorkCardRegister.style';
import WorkCardRegisterContent from '../workCardRegisterContent/WorkCardRegisterContent';
import useVisibility from '@/hooks/useVisibility';
import { useState } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import { useChangeTimeByResize } from '@/pages/homePage/hooks/work/useChangeTimeByResize';
import { useResizeCollision } from '@/components/dnd/hooks/useResizeCollision';
import { patchMyWorkTime } from '@/apis/myWork.api';
import ToolTip from '@/components/toolTip/ToolTip';
import { FlexStyles } from '@/styles/commonStyles';
import WorkCardContentS from '../workCardRegisterContent/WorkCardRegisterContent.style';

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
  const handleResizeEnd = async () => {
    setIsResizing(false);
    handleResizeCollision(block, newWidth);
    try {
      await patchMyWorkTime({
        myWorkId: block.id,
        startTime: block.startTime,
        endTime: block.endTime,
      });
    } catch (error) {
      console.error('작업 시간 업데이트 실패:', error);
    }
    //TODO: 리사이징 후에 30분 미만이 되어 더이상 resize가 안되면 handleResizeEnd에서 setIsResizing(false)이 안되어 버튼이 안보이는 문제 해결
    //TODO: 앞에 있는 블록(z-index가 낮은 블록)을 뒤로 늘려서 뒤에 있는 블록과 충돌할 경우 충돌 감지 안됨 해결
  };

  return (
    <>
      <div
        css={S.WorkCardContainer({
          width: newWidth,
          height: block.size.height,
        })}
        onMouseDown={onMouseDown}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {!isDragging && !isResizing && isVisible && newWidth < 160 && (
          <ToolTip
            direction={'Top'}
            content={
              <div css={S.WorkCardToolTip}>
                <div css={FlexStyles.flexRow}>
                  <div css={WorkCardContentS.WorkCardTitle}>
                    {block.workName}
                  </div>
                  <div css={WorkCardContentS.WorkCardCropName}>
                    {block.cropName}
                  </div>
                </div>
                <div css={WorkCardContentS.WorkCardTime}>{block.workTime}</div>
              </div>
            }
            type={'Default'}
            offset={80}
          />
        )}
        {/* 왼쪽 리사이징 핸들 */}
        {!isDragging && onResize && (
          <div
            css={S.WorkCardResizeHandleLeft}
            onPointerDown={e => {
              e.stopPropagation();
              e.preventDefault();
              handleResizeStart(e, block, 'left');
            }}
            onPointerUp={handleResizeEnd}
          />
        )}

        {/* 오른쪽 리사이징 핸들 */}
        {!isDragging && onResize && (
          <div
            css={S.WorkCardResizeHandleRight}
            onPointerDown={e => {
              e.stopPropagation();
              e.preventDefault();
              handleResizeStart(e, block, 'right');
            }}
            onPointerUp={handleResizeEnd}
          />
        )}

        <WorkCardRegisterContent
          width={newWidth}
          cropName={block.cropName}
          workName={block.workName}
          workTime={block.workTime}
        />

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
