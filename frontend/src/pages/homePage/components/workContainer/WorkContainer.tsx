import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import useWorkBlocks from '@/pages/homePage/hooks/useWorkBlocks';

import MainGraph from '../mainGraph/MainGraph';
import GraphMenu from '../graphMenu/GraphMenu';
import { WEATHER_METRICS, type WeatherMetrics } from '@/types/weather.types';
import { WeatherRiskDto } from '@/types/openapiGenerator';
import { generateYTicks } from '../../utils/lineChartUtil';
import { getUnit } from '@/utils/getUnit';
import ChartS from '../mainLineChart/MainLineChart.style'; // TODO: 나중에 WorkContainer 스타일 정의 및 변경
import useContainer from '@/pages/homePage/hooks/useContainer';
import WorkContainerS from './WorkContainer.style';
import useDragWorkBlock from '@/pages/homePage/hooks/useDragWorkBlock';
import { useWeatherGraphQuery } from '../../hooks/useWeatherGraphQuery';
import RegisterWorkContainer from '../registerWorkContainer/RegisterWorkContainer';
import { useRecommendedWorks } from '../../hooks/useRecommendedWorks';
import { useCreateWorkBlock } from '../../hooks/useCreateWorkBlock';
import type { WorkBlockType } from '@/types/workCard.type';
import updateWorkTimeByPos from '@/dndTimeline/utils/updateWorkTimeByPos';
import { sortWorkBlocks } from '../../utils/sortWorkBlocks';

const WorkContainer = ({
  weatherRiskData,
}: {
  weatherRiskData: WeatherRiskDto[];
}) => {
  const [currentTab, setCurrentTab] = useState<WeatherMetrics>(
    WEATHER_METRICS.PRECIPITATION
  );

  const { data: graphData, error } = useWeatherGraphQuery(currentTab);

  if (error) {
    console.error('Error fetching graph data:', error);
  }

  const { workBlocks, updateWorkBlocks, removeWorkBlock, addWorkBlock } =
    useWorkBlocks();

  const { containerRef, scrollOffset, setScrollOffset } = useContainer();

  const {
    recommendedWorks,
    myCrops,
    selectedCrop,
    handleCropClick,
    selectedRecommendedWork,
    setSelectedRecommendedWork,
  } = useRecommendedWorks();

  const { handleCreateWork } = useCreateWorkBlock({
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    scrollOffset,
    addWorkBlock,
    workBlocks,
  });

  const { handleResize } = useDragWorkBlock(
    workBlocks,
    updateWorkBlocks,
    containerRef as React.RefObject<HTMLDivElement>,
    scrollOffset
  ); //TODO: 전체 블록을 업데이트하는 게 아니라 블록 하나만 리사이즈 후 업데이트 필요

  // 드래그 상태
  const [draggingBlock, setDraggingBlock] = useState<WorkBlockType | null>(
    null
  );
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // 컨테이너 내부 좌표 변환 함수
  const getContainerCoords = useCallback(
    (e: PointerEvent) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();

      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    },
    [containerRef]
  );

  const handleStartDrag = (e: PointerEvent, block: WorkBlockType) => {
    const containerCoords = getContainerCoords(e);

    const rect = containerRef.current?.getBoundingClientRect();

    setDragOffset({
      x: e.clientX - (rect?.left ?? 0) + scrollOffset - block.position.x,
      y: e.clientY - (rect?.top ?? 0) - block.position.y,
    });

    // 시작 시에는 블록 위치를 변경하지 않음 (초기 흔들림 방지)
    setDraggingBlock(block);
    setDragPosition(containerCoords);
  };

  useEffect(() => {
    // 마우스 이동
    const handlePointerMove = (e: PointerEvent) => {
      if (!draggingBlock) return;
      const containerCoords = getContainerCoords(e);
      setDragPosition(containerCoords);
      const newX = containerCoords.x + scrollOffset - dragOffset.x;
      const newY = containerCoords.y - dragOffset.y;
      const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
        draggingBlock.startTime,
        draggingBlock.endTime,
        {
          x: newX,
          y: newY,
        }
      );
      setDraggingBlock({
        ...draggingBlock,
        position: { x: newX, y: newY },
        startTime: newStartTime,
        endTime: newEndTime,
        workTime: newWorkTime,
      });
    };

    // 드래그 끝
    const handleEndDrag = (e: PointerEvent) => {
      if (!draggingBlock) return;

      const pos = getContainerCoords(e);
      // drop 위치를 block 좌표로 업데이트 (오프셋 반영)
      const newBlocks = workBlocks.map(block => {
        const newBlockPosition = {
          x: pos.x + scrollOffset - dragOffset.x,
          y: pos.y - dragOffset.y,
        };
        const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
          block.startTime,
          block.endTime,
          newBlockPosition
        );
        const newTimeUpdatedBlock = {
          ...block,
          position: newBlockPosition,
          startTime: newStartTime,
          endTime: newEndTime,
          workTime: newWorkTime,
        };
        return block.id === draggingBlock.id ? newTimeUpdatedBlock : block;
      });

      const newSortedBlocks = sortWorkBlocks(newBlocks);
      updateWorkBlocks(newSortedBlocks);

      setDraggingBlock(null);
      setDragPosition(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handleEndDrag);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handleEndDrag);
    };
  }, [
    draggingBlock,
    dragOffset.x,
    dragOffset.y,
    getContainerCoords,
    scrollOffset,
    updateWorkBlocks,
    workBlocks,
  ]);

  return (
    <>
      <div ref={containerRef} css={WorkContainerS.ContainerWrapper}>
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
        <div
          css={[
            WorkContainerS.MaskGradientWrapper,
            css`
              position: relative;
            `,
          ]}
        >
          <div
            css={WorkContainerS.ScrollContainer}
            onScroll={e => {
              setScrollOffset(e.currentTarget.scrollLeft);
            }}
          >
            <MainGraph
              graphData={graphData}
              weatherRiskData={weatherRiskData}
            />

            {workBlocks.map(block => {
              const { id, position } = block;

              return (
                <div
                  key={id}
                  css={css`
                    position: absolute;
                    left: 0;
                    top: 0;
                    transform: translate3d(${position.x}px, ${position.y}px, 0);

                    opacity: ${draggingBlock?.id === id ? 0.5 : 1};
                    pointer-events: auto;
                    z-index: 1000;
                  `}
                  onPointerDown={e =>
                    handleStartDrag(e as unknown as PointerEvent, block)
                  }
                >
                  <WorkCardRegister
                    block={block}
                    isDragging={false}
                    onDelete={() => removeWorkBlock(id)}
                    onResize={block => handleResize(block.id, block)}
                    containerRef={containerRef}
                    scrollOffset={scrollOffset}
                    allBlocks={workBlocks}
                    updateWorkBlocks={updateWorkBlocks}
                  />
                </div>
              );
            })}
            <WorkCellsContainer
              selectedRecommendedWork={selectedRecommendedWork}
            />
          </div>
        </div>
        {/* 드래그 중일 때 오버레이 */}
        {draggingBlock && dragPosition && (
          <div
            css={css`
              position: absolute;
              left: 0;
              top: 0;
              transform: translate3d(
                ${dragPosition.x - dragOffset.x}px,
                ${dragPosition.y - dragOffset.y}px,
                0
              );
              pointer-events: none;
              z-index: 1000;
            `}
          >
            <WorkCardRegister
              block={draggingBlock}
              isDragging={true}
              containerRef={containerRef}
              scrollOffset={scrollOffset}
              allBlocks={workBlocks}
              updateWorkBlocks={updateWorkBlocks}
            />
          </div>
        )}
      </div>

      <RegisterWorkContainer
        recommendedWorks={recommendedWorks}
        myCrops={myCrops}
        selectedCrop={selectedCrop}
        handleCropClick={handleCropClick}
        handleCreateWork={handleCreateWork}
        setSelectedRecommendedWork={setSelectedRecommendedWork}
      />
    </>
  );
};

export default WorkContainer;
