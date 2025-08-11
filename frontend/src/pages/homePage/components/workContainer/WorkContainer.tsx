import { type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { css } from '@emotion/react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import { useDragAndDrop } from '@/hooks/dnd/useDragAndDrop';
import useRemoveOnOutOfBound from '@/hooks/dnd/useRemoveOnOutOfBound';
import type { WorkBlockType } from '@/types/workCard.type';
import updateBlockWorkTime from '@/pages/homePage/utils/updateBlockWorkTime';
import useWorkBlocks from '@/contexts/useWorkBlocks';

const DragOverlay = ({
  isDragging,
  draggedItem,
  position,
  children,
}: {
  isDragging: boolean;
  draggedItem: WorkBlockType | null;
  position: { x: number; y: number };
  children: React.ReactNode;
}) => {
  if (!isDragging || !draggedItem) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        pointerEvents: 'auto',
        zIndex: 1000,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {children}
    </div>,
    document.body
  );
};

const WorkContainer = () => {
  const { workBlocks, updateWorkBlocks, removeWorkBlock } = useWorkBlocks();

  const {
    containerRef,
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isItemDragging,
    draggedItemRef,
    latestMousePos,
  } = useDragAndDrop<WorkBlockType>({
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: updated => updateWorkBlocks(updated),
  });

  // const { checkAndRemove } = useRemoveOnOutOfBound<WorkBlockType>({
  //   containerRef: containerRef as RefObject<HTMLElement>,
  //   items: workBlocks,
  //   getItemId: block => block.id,
  //   getItemPosition: block => block.position,
  //   getItemWidth: block => block.width,
  //   onRemove: id => removeWorkBlock(id),
  // });

  const handleEndDrag = () => {
    const draggingId = draggedItemRef.current?.id;
    if (draggingId !== null && draggingId !== undefined) {
      //checkAndRemove(draggingId);
    }
    endDrag();
  };

  return (
    <>
      <div
        ref={containerRef}
        onMouseMove={e => {
          updatePosition(e, (block, pos) => updateBlockWorkTime(block, pos));
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
        >
          {workBlocks.map(block => {
            const { id, workName, workTime, width, position } = block;
            if (isItemDragging(id)) {
              const mousePosition = latestMousePos.current;
              const overlayPosition = mousePosition
                ? {
                    x: mousePosition.x - width / 2,
                    y: mousePosition.y - 20,
                  }
                : position;

              return (
                <DragOverlay
                  key={`overlay-${id}`}
                  isDragging={isDragging}
                  draggedItem={draggedItemRef.current}
                  position={overlayPosition}
                >
                  <WorkCardRegister
                    id={id}
                    cropName={block.cropName}
                    workName={workName}
                    workTime={workTime}
                    isDragging={isDragging}
                    width={width}
                    x={0}
                    y={0}
                    onMouseDown={() => {}}
                  />
                </DragOverlay>
              );
            }
            return (
              <WorkCardRegister
                key={id}
                id={id}
                cropName={block.cropName}
                workName={workName}
                workTime={workTime}
                isDragging={isItemDragging(id)}
                width={width}
                x={position.x}
                y={position.y}
                onMouseDown={e => {
                  startDrag(e, id, workBlocks);
                }}
              />
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
