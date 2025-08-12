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

  // 드래그 중인 블록
  const [draggingBlock, setDraggingBlock] = useState<WorkBlockType | null>(
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
    onPositionChange: updated => {
      //드래그 중인 블록만 업데이트
      if (draggingBlock) {
        const updatedBlock = updated.find(
          block => block.id === draggingBlock.id
        );
        if (updatedBlock) {
          setDraggingBlock(updatedBlock);
        }
      }
    },
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

  const handleStartDrag = (e: React.MouseEvent, block: WorkBlockType) => {
    setInitialPosition(block.position);
    setDraggingBlock(block);
    startDrag(e, block.id, workBlocks);
  };

  const handleEndDrag = () => {
    const draggingId = draggedItemRef.current?.id;
    if (draggingId !== null && draggingId !== undefined) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        checkAndRevert(rect, scrollOffset);
      }
    }

    // 드래그가 끝나면 임시 상태를 실제 workBlocks에 반영
    if (draggingBlock) {
      const updatedBlocks = workBlocks.map(block =>
        block.id === draggingBlock.id ? draggingBlock : block
      );
      updateWorkBlocks(updatedBlocks);
      setDraggingBlock(null);
    }

    endDrag();
  };

  const handleResize = (blockId: number, newBlock: WorkBlockType) => {
    if (draggingBlock && draggingBlock.id === blockId) {
      // 드래그 중일 때는 임시 상태만 업데이트
      console.log('is dragging');
      setDraggingBlock(newBlock);
    } else {
      // 드래그 중이 아닐 때는 즉시 업데이트
      console.log('is not dragging');
      const updatedBlocks = workBlocks.map(b =>
        b.id === blockId ? newBlock : b
      );
      updateWorkBlocks(updatedBlocks);
    }
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
            const { id, position } = block;
            const isCurrentlyDragging =
              isItemDragging(id) || isRevertingItemId === id;

            // 드래그 중인 블록은 DragOverlay만 렌더링
            if (isCurrentlyDragging) {
              const overlayPosition = {
                x:
                  draggingBlock?.id === id
                    ? draggingBlock.position.x
                    : position.x,
                y:
                  draggingBlock?.id === id
                    ? draggingBlock.position.y
                    : position.y,
              };

              return (
                <DragOverlay
                  key={`overlay-${id}`}
                  position={overlayPosition}
                  containerRef={containerRef}
                  scrollOffset={scrollOffset}
                >
                  <WorkCardRegister
                    block={draggingBlock?.id === id ? draggingBlock : block}
                    isDragging={isDragging}
                    onDelete={() => removeWorkBlock(id)}
                    onResize={newBlock => handleResize(id, newBlock)}
                  />
                </DragOverlay>
              );
            }

            return (
              <div
                key={id}
                css={[
                  DragOverlayStyle.DragOverlay({
                    x: position.x,
                    y: position.y,
                  }),
                  css`
                    position: absolute;
                  `,
                ]}
                onMouseDown={e => handleStartDrag(e, block)}
              >
                <WorkCardRegister
                  block={block}
                  isDragging={false}
                  onDelete={() => removeWorkBlock(id)}
                  onResize={newBlock => handleResize(id, newBlock)}
                />
              </div>
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
