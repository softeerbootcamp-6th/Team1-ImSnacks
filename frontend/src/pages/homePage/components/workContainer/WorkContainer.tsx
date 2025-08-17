import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import { useDragAndDrop } from '@/hooks/dnd/useDragAndDrop';
import type { Position, WorkBlockType } from '@/types/workCard.type';
import updateBlockWorkTime from '@/pages/homePage/utils/updateBlockWorkTime';
import useWorkBlocks from '@/pages/homePage/contexts/useWorkBlocks';
import DragOverlay from '@/components/dnd/DragOverlay';
import DragOverlayStyle from '@/components/dnd/DragOverlay.style';
import { useRevertPosition } from '@/hooks/dnd/useRevertPosition';
import animateBlock from '@/utils/animateBlock';
import { hasCollisionWithOthers } from '@/utils/collisionUtils';
import {
  findFuturePosition,
  handleCollisionRevert,
  moveToValidPosition,
  cleanupDragState,
} from '../../utils/workContainerUtils';
import { WORK_TIME_Y_COORDINATE } from '@/constants/workTimeCoordinate';
import MainGraph from '../mainGraph/MainGraph';
import GraphMenu from '../graphMenu/GraphMenu';
import { WEATHER_METRICS, type WeatherMetrics } from '@/types/weather.types';
import { getWeatherGraph } from '@/apis/weather.api';
import {
  GetWeatherGraphResponse,
  WeatherRiskDto,
} from '@/types/openapiGenerator';
import { generateYTicks } from '../../utils/lineChartUtil';
import { getUnit } from '@/utils/getUnit';
import ChartS from '../mainLineChart/MainLineChart.style'; // TODO: 나중에 WorkContainer 스타일 정의 및 변경
import useContainer from '@/pages/homePage/contexts/useContainer';
import WorkContainerS from './WorkContainer.style';
import { patchMyWork } from '@/apis/myWork.api';

const WorkContainer = ({
  weatherRiskData,
}: {
  weatherRiskData: WeatherRiskDto[];
}) => {
  const [currentTab, setCurrentTab] = useState<WeatherMetrics>(
    WEATHER_METRICS.PRECIPITATION
  );
  const [graphData, setGraphData] = useState<GetWeatherGraphResponse>();

  // API 데이터 가져오기
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await getWeatherGraph(currentTab);
        if (!ignore && res.data) setGraphData(res.data);
      } catch (e) {
        if (!ignore) console.error('Error fetching graph data:', e);
      }
    })();
    return () => {
      ignore = true;
    };
  }, [currentTab]);

  const { workBlocks, updateWorkBlocks, removeWorkBlock } = useWorkBlocks();
  const { containerRef, scrollOffset, setScrollOffset } = useContainer();

  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const [futurePosition, setFuturePosition] = useState<Position | null>(null);
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
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isDraggingItem,
    draggedItemRef,
  } = useDragAndDrop<WorkBlockType>({
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: updated => {
      updateWorkBlocks(updated);

      // futurePosition 업데이트 - 충돌하지 않는 위치 계산
      const futurePosition = findFuturePosition(
        updated,
        draggingBlockId,
        containerRef,
        scrollOffset
      );
      if (futurePosition) {
        setFuturePosition(futurePosition);
      }
    },
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
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
    setDraggingBlockId(block.id);
    setFuturePosition(null);
    draggedItemRef.current = block;
    startDrag(e, block.id, workBlocks);
  };

  const handleEndDrag = async () => {
    const draggingId = draggingBlockId;
    if (draggingId !== null) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        checkAndRevert(rect, scrollOffset);
      }

      const draggingBlock = workBlocks.find(block => block.id === draggingId);
      if (draggingBlock) {
        // 다른 블록과의 충돌 검사
        const isCollision = hasCollisionWithOthers(
          draggingBlock,
          workBlocks,
          draggingId
        );

        if (isCollision) {
          handleCollisionRevert(
            draggingId,
            draggingBlock,
            futurePosition,
            initialPosition,
            revertAnimationRef,
            setIsRevertingItemId,
            latestBlocksRef,
            updateWorkBlocks
          );
          cleanupDragState(setDraggingBlockId, setFuturePosition, endDrag);
          return;
        }

        // 유효하지 않은 위치 검사 및 되돌리기
        moveToValidPosition(
          Object.values(WORK_TIME_Y_COORDINATE),
          draggingId,
          draggingBlock,
          revertAnimationRef,
          setIsRevertingItemId,
          latestBlocksRef,
          updateWorkBlocks
        );

        // 모든 valid 로직이 통과한 후 최종 시간으로 API 호출
        try {
          const finalBlock = workBlocks.find(block => block.id === draggingId);
          if (finalBlock) {
            await patchMyWork({
              myWorkId: draggingId,
              startTime: finalBlock.startTime,
              endTime: finalBlock.endTime,
            });
            console.log(
              '작업 시간이 성공적으로 업데이트되었습니다:',
              finalBlock
            );
          }
        } catch (error) {
          console.error('작업 시간 업데이트 실패:', error);
          // 에러 발생 시 원래 위치로 되돌리기
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
        }

        cleanupDragState(setDraggingBlockId, setFuturePosition, endDrag);
      }
    }

    cleanupDragState(setDraggingBlockId, setFuturePosition, endDrag);
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
    <div
      ref={containerRef}
      onMouseMove={e => {
        updatePosition(e, (block, pos) => updateBlockWorkTime(block, pos, 100));
      }}
      onMouseUp={handleEndDrag}
      onMouseLeave={handleEndDrag}
      css={WorkContainerS.ContainerWrapper}
    >
      <GraphMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {graphData && (
        <div css={ChartS.FixedYAxisWrapper}>
          {getUnit(graphData.weatherMetric ?? 'PRECIPITATION')}
          <div css={ChartS.YAxis}>
            {generateYTicks({
              min: graphData.min ?? 0,
              max: graphData.max ?? 100,
            }).map(tick => (
              <div key={tick} css={ChartS.YAxisTick}>
                {tick}
              </div>
            ))}
          </div>
        </div>
      )}
      <div css={WorkContainerS.MaskGradientWrapper}>
        <div
          css={WorkContainerS.ScrollContainer}
          onScroll={e => {
            setScrollOffset(e.currentTarget.scrollLeft);
          }}
        >
          <MainGraph graphData={graphData} weatherRiskData={weatherRiskData} />

          {workBlocks.map(block => {
            const { id, position } = block;
            const isCurrentlyDragging =
              isDraggingItem(id) || isRevertingItemId === id;

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
                    containerRef={containerRef}
                    scrollOffset={scrollOffset}
                    allBlocks={workBlocks}
                    updateWorkBlocks={updateWorkBlocks}
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
                  containerRef={containerRef}
                  scrollOffset={scrollOffset}
                  allBlocks={workBlocks}
                  updateWorkBlocks={updateWorkBlocks}
                />
              </div>
            );
          })}

          <WorkCellsContainer />
        </div>
      </div>
    </div>
  );
};

export default WorkContainer;
