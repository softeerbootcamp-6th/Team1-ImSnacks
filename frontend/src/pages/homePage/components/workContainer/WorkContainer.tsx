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
import animateBlock from '@/utils/animateBlock';

const WorkContainer = () => {
  const { workBlocks, updateWorkBlocks, removeWorkBlock } = useWorkBlocks();

  const [scrollOffset, setScrollOffset] = useState(0);
  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const latestBlocksRef = useRef<WorkBlockType[]>(workBlocks);
  const revertAnimationRef = useRef<number | null>(null);
  const [isRevertingItemId, setIsRevertingItemId] = useState<number | null>(
    null
  );

  // 드래그 중인 블록의 ID만 추적
  const [draggingBlockId, setDraggingBlockId] = useState<number | null>(null);

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
      // workBlocks를 직접 업데이트하여 즉시 반영
      updateWorkBlocks(updated);
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
      console.log('checkAndRevert');

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
    setDraggingBlockId(block.id);
    draggedItemRef.current = block;
    startDrag(e, block.id, workBlocks);
  };

  const handleEndDrag = () => {
    const draggingId = draggingBlockId;
    if (draggingId !== null) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        checkAndRevert(rect, scrollOffset);
      }
    }

    if (draggingId !== null) {
      const draggingBlock = workBlocks.find(block => block.id === draggingId);
      if (draggingBlock) {
        const {
          position: { x: blockX, y: blockY },
          size: { width: blockWidth, height: blockHeight },
        } = draggingBlock;

        const centerX = blockX + blockWidth / 2;
        const centerY = blockY + blockHeight / 2;

        // 다른 블록과의 충돌 검사
        const hasCollision = workBlocks.some(block => {
          if (block.id === draggingId) return false;

          const otherCenterX = block.position.x + block.size.width / 2;
          const otherCenterY = block.position.y + block.size.height / 2;

          const distanceX = Math.abs(centerX - otherCenterX);
          const distanceY = Math.abs(centerY - otherCenterY);

          if (
            distanceX < blockWidth / 2 + block.size.width / 2 &&
            distanceY < blockHeight / 2 + block.size.height / 2
          ) {
            return true;
          }

          return false;
        });

        if (hasCollision) {
          // 충돌이 있으면 원래 위치로 되돌리기
          setIsRevertingItemId(draggingId);

          if (initialPosition) {
            animateBlock(
              revertAnimationRef,
              setIsRevertingItemId,
              latestBlocksRef,
              updateWorkBlocks,
              draggingId,
              draggingBlock.position,
              initialPosition
            );
          }

          setDraggingBlockId(null);
          endDrag();
          return;
        }
      }
    }

    // 드래그가 끝나면 workBlocks는 이미 업데이트되어 있음
    setDraggingBlockId(null);
    endDrag();
  };

  const handleResize = (blockId: number, newBlock: WorkBlockType) => {
    if (draggingBlockId === blockId) {
      // 드래그 중일 때는 workBlocks를 직접 업데이트
      const updatedBlocks = workBlocks.map(b =>
        b.id === blockId ? newBlock : b
      );
      updateWorkBlocks(updatedBlocks);
    } else {
      // 드래그 중이 아닐 때는 즉시 업데이트
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
                  draggingBlockId === id
                    ? workBlocks.find(b => b.id === id)?.position.x ||
                      position.x
                    : position.x,
                y:
                  draggingBlockId === id
                    ? workBlocks.find(b => b.id === id)?.position.y ||
                      position.y
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
                    block={workBlocks.find(b => b.id === id) || block}
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
