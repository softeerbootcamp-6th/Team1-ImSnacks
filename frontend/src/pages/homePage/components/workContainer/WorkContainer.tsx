import { useEffect, useState, useCallback } from 'react';
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
  );

  // 드래그 상태
  const [draggingBlock, setDraggingBlock] = useState<WorkBlockType | null>(
    null
  );
  const [dragPosition, setDragPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // 컨테이너 내부 좌표 변환 함수
  const getContainerCoords = (e: PointerEvent | React.MouseEvent) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // 드래그 시작
  const handleStartDrag = (e: React.MouseEvent, block: WorkBlockType) => {
    e.stopPropagation();
    setDraggingBlock(block);
    setDragPosition(getContainerCoords(e));

    // document 이벤트 등록
    document.addEventListener('pointermove', handleMouseMove);
    document.addEventListener('pointerup', handleEndDrag);
  };

  // 마우스 이동
  const handleMouseMove = (e: PointerEvent) => {
    if (!draggingBlock) return;
    setDragPosition(getContainerCoords(e));
  };

  // 드래그 끝
  const handleEndDrag = (e: PointerEvent) => {
    if (!draggingBlock) return;

    const pos = getContainerCoords(e);

    // drop 위치를 block 좌표로 업데이트
    const newBlocks = workBlocks.map(block =>
      block.id === draggingBlock.id
        ? {
            ...block,
            position: {
              x: pos.x,
              y: pos.y,
            },
          }
        : block
    );
    updateWorkBlocks(newBlocks);

    setDraggingBlock(null);
    setDragPosition(null);

    // 이벤트 해제
    document.removeEventListener('pointermove', handleMouseMove);
    document.removeEventListener('pointerup', handleEndDrag);
  };

  return (
    <>
      <div ref={containerRef} css={WorkContainerS.ContainerWrapper}>
        <GraphMenu
          currentTab={currentTab}
          setCurrentTab={handleCurrentTabChange}
        />

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
                    pointer-events: auto;
                    z-index: 1000;
                  `}
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
            <WorkCellsContainer
              selectedRecommendedWork={selectedRecommendedWork}
            />
          </div>
          {/* 드래그 중일 때 오버레이 */}
          {draggingBlock && dragPosition && (
            <div
              css={css`
                position: absolute;
                left: 0;
                top: 0;
                transform: translate3d(
                  ${dragPosition.x}px,
                  ${dragPosition.y}px,
                  0
                );
                pointer-events: auto;
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
