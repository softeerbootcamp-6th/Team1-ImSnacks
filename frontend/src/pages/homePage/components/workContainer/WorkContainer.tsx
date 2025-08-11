import { useState } from 'react';
import { css } from '@emotion/react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { GrayScale } from '@/styles/colors';
import { useDragAndDrop } from '@/hooks/dnd/useDragAndDrop';
import type { WorkBlockType } from '@/types/workCard.type';
import updateBlockWorkTime from '@/pages/homePage/utils/updateBlockWorkTime';
import useWorkBlocks from '@/contexts/useWorkBlocks';
import DragOverlay from '@/components/dnd/DragOverlay';

const WorkContainer = () => {
  const { workBlocks, updateWorkBlocks } = useWorkBlocks();

  const [scrollOffset, setScrollOffset] = useState(0);

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

  const handleEndDrag = () => {
    const draggingId = draggedItemRef.current?.id;
    if (draggingId !== null && draggingId !== undefined) {
      //TODO: 컨테이너 밖으로 나갈 시 원복
    }
    endDrag();
  };

  const generateDragOverlay = (
    id: number,
    e: React.MouseEvent,
    workBlocks: WorkBlockType[]
  ) => {
    startDrag(e, id, workBlocks);
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
                {isItemDragging(id) && (
                  <DragOverlay
                    key={`overlay-${id}`}
                    isDragging={isDragging}
                    draggedItem={draggedItemRef.current}
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
                  style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y,
                    pointerEvents: 'auto',
                    zIndex: 1000,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseDown={e => {
                    generateDragOverlay(id, e, workBlocks);
                  }}
                >
                  <WorkCardRegister
                    id={id}
                    cropName={block.cropName}
                    workName={workName}
                    workTime={workTime}
                    isDragging={isItemDragging(id)}
                    width={width}
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
