import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import { useDragAndDrop } from '@/hooks/dnd/useDragAndDrop';
import type { Position, WorkBlockType } from '@/types/workCard.type';
import updateBlockWorkTime from '@/pages/homePage/utils/updateBlockWorkTime';
import useWorkBlocks from '@/contexts/useWorkBlocks';
import DragOverlay from '@/components/dnd/DragOverlay';
import DragOverlayStyle from '@/components/dnd/DragOverlay.style';
import { useRevertPosition } from '@/hooks/dnd/useRevertPosition';
import animateBlock from '../../utils/animateBlock';

const WorkContainer = () => {
  const { workBlocks, updateWorkBlocks, removeWorkBlock } = useWorkBlocks();

  const [scrollOffset, setScrollOffset] = useState(0);
  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const latestBlocksRef = useRef<WorkBlockType[]>(workBlocks);
  const revertAnimationRef = useRef<number | null>(null);
  const [isRevertingItemId, setIsRevertingItemId] = useState<number | null>(
    null
  );

  useEffect(() => {
    latestBlocksRef.current = workBlocks;
  }, [workBlocks]);

  const {
    containerRef,
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isItemDragging,
    draggedItemRef,
  } = useDragAndDrop<WorkBlockType>({
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: updated => updateWorkBlocks(updated),
  });

  const { checkAndRevert } = useRevertPosition<WorkBlockType>({
    draggedItem: draggedItemRef.current,
    initialPosition,
    getItemPosition: block => block.position,
    onRevert: () => {
      setIsRevertingItemId(draggedItemRef.current?.id || null);
      if (!draggedItemRef.current || !initialPosition) return;

      const revertId = draggedItemRef.current.id;
      const currentPos = draggedItemRef.current.position;

      animateBlock(
        revertAnimationRef,
        setIsRevertingItemId,
        latestBlocksRef,
        updateWorkBlocks,
        revertId as number,
        currentPos,
        initialPosition
      );
    },
  });

  const handleEndDrag = () => {
    const draggingId = draggedItemRef.current?.id;
    if (draggingId !== null && draggingId !== undefined) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        checkAndRevert(rect, scrollOffset);
      }
    }
    endDrag();
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={e => {
          updatePosition(e, (block, pos) =>
            updateBlockWorkTime(block, pos, 100)
          );
        }}
        onMouseUp={handleEndDrag}
        onMouseLeave={handleEndDrag}
        css={css`
          width: 100%;
        `}
      >
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
          onScroll={e => {
            setScrollOffset(e.currentTarget.scrollLeft);
          }}
        >
          {workBlocks.map(block => {
            const { id, workName, cropName, workTime, width, position } = block;
            const overlayPosition = {
              x: position.x,
              y: position.y,
            };

            return (
              <>
                {(isItemDragging(id) || isRevertingItemId === id) && (
                  <DragOverlay
                    key={`overlay-${id}`}
                    position={overlayPosition}
                    containerRef={containerRef}
                    scrollOffset={scrollOffset}
                  >
                    <WorkCardRegister
                      id={id}
                      cropName={cropName}
                      workName={workName}
                      workTime={workTime}
                      isDragging={isDragging}
                      width={width}
                    />
                  </DragOverlay>
                )}
                <div
                  css={[
                    DragOverlayStyle.DragOverlay({
                      x: position.x,
                      y: position.y,
                    }),
                    css`
                      position: absolute;
                    `,
                  ]}
                  onMouseDown={e => {
                    setInitialPosition(block.position);
                    startDrag(e, id, workBlocks);
                  }}
                >
                  <WorkCardRegister
                    id={id}
                    cropName={block.cropName}
                    workName={workName}
                    workTime={workTime}
                    isDragging={isItemDragging(id)}
                    width={width}
                    onDelete={() => removeWorkBlock(id)}
                  />
                </div>
              </>
            );
          })}
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
            <WorkCellsContainer isDragging={isDragging} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkContainer;
