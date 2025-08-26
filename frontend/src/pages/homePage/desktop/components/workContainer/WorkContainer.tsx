import { useEffect, useRef, useState } from 'react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import useWorkBlocks from '@/pages/homePage/desktop/hooks/useWorkBlocks';
import MainGraph from '../mainGraph/MainGraph';
import GraphMenu from '../graphMenu/GraphMenu';
import { WEATHER_METRICS, type WeatherMetrics } from '@/types/weather.types';
import { generateYTicks } from '@/pages/homePage/desktop/utils/lineChartUtil';
import { getWeatherUnit } from '@/utils/getWeatherUnitUtil';
import ChartS from '../mainLineChart/MainLineChart.style'; // TODO: 나중에 WorkContainer 스타일 정의 및 변경
import { useWeatherGraphQuery } from '@/pages/homePage/desktop/hooks/useWeatherGraphQuery';
import { useRecommendedWorks } from '@/pages/homePage/desktop/hooks/useRecommendedWorks';
import { useCreateWorkBlock } from '@/pages/homePage/desktop/hooks/useCreateWorkBlock';
import { useDragBlock } from '@/lib/dnd/hooks/useDragBlock';
import DragContainer from '@/lib/dnd/components/DragContainer';
import { useTimeStore } from '@/store/useTimeStore';
import { formatRelativeTime } from '@/utils/formatTimeUtil';
import type {
  RecommendedWorksResponse,
  WeatherRiskDto,
} from '@/types/openapiGenerator';
import RegisterWorkContainer from '../registerWorkContainer/RegisterWorkContainer';
import useContainer from '@/pages/homePage/desktop/hooks/useContainer';
import { useResizeBlock } from '@/lib/dnd/hooks/useResizeBlock';
import DraggableItem from '@/lib/dnd/components/DraggableItem';
import DraggingItem from '@/lib/dnd/components/DraggingItem';

import S from './WorkContainer.style';

const WorkContainer = ({
  weatherRiskData,
}: {
  weatherRiskData: WeatherRiskDto[];
}) => {
  const [currentTab, setCurrentTab] = useState<WeatherMetrics>(
    WEATHER_METRICS.TEMPERATURE
  );

  const renderCountRef = useRef(0);
  useEffect(() => {
    renderCountRef.current++;
    console.log('WorkContainer render count:', renderCountRef.current);
  });

  const { currentTime } = useTimeStore();
  const { data: graphData, error, refetch } = useWeatherGraphQuery(currentTab);

  if (error) {
    console.error('Error fetching graph data:', error);
  }

  useEffect(() => {
    if (currentTime.minute() === 0) {
      refetch();
    }
  }, [currentTime, refetch]);

  const {
    workBlocks,
    updateWorkBlocks,
    removeWorkBlock,
    addWorkBlock,
    updateWorkBlockTimeOnServer,
  } = useWorkBlocks();

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

  const { draggingBlock, dragPointerPosition, dragOffset, handleStartDrag } =
    useDragBlock({
      containerRef,
      scrollOffset,
      workBlocks,
      updateWorkBlocks,
      updateWorkBlockTimeOnServer,
    });

  const { resizingBlock, handleResizeStart, handleResizeEnd } = useResizeBlock({
    containerRef,
    scrollOffset,
    workBlocks,
    updateWorkBlocks,
    updateWorkBlockTimeOnServer,
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget) {
      setScrollOffset(e.currentTarget.scrollLeft);
    }
  };

  // DragContainer에 드롭 처리
  const handleContainerDrop = async (e: React.DragEvent) => {
    e.preventDefault();

    try {
      const workData = e.dataTransfer.getData('application/json');

      if (!(workData && selectedCrop)) return;
      const work: RecommendedWorksResponse = JSON.parse(workData);
      const containerElement = containerRef?.current;

      if (!containerElement) return;

      const containerRect = containerElement.getBoundingClientRect();
      const dropX = e.clientX - containerRect.left + scrollOffset;
      // 새로운 작업 블록 생성 (x좌표 전달)
      await handleCreateWork(work, selectedCrop, dropX);
    } catch (error) {
      console.error('드롭된 데이터 파싱 실패:', error);
    }
  };

  // DragContainer에 드래그 오버 처리
  const handleContainerDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  return (
    <>
      <DragContainer
        containerRef={containerRef}
        css={S.ContainerWrapper}
        onDrop={handleContainerDrop}
        onDragOver={handleContainerDragOver}
      >
        <GraphMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {graphData && !graphData?.isUpdated && (
          <p css={S.LastUpdateText}>
            마지막 업데이트{' '}
            {formatRelativeTime(graphData?.lastUpdateTime ?? '', currentTime)}
          </p>
        )}
        {graphData && (
          <div css={ChartS.FixedYAxisWrapper}>
            {getWeatherUnit(graphData.weatherMetric ?? 'PRECIPITATION')}
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
        <div css={S.RightMaskGradientWrapper(scrollOffset)}>
          <div
            css={[S.ScrollContainer, S.LeftMaskGradientWrapper(scrollOffset)]}
            onScroll={handleScroll}
          >
            <MainGraph
              graphData={graphData}
              weatherRiskData={weatherRiskData}
              isError={!!error}
            />

            {workBlocks.map(block => {
              const { id, position } = block;
              if (resizingBlock?.id === id) return;

              return (
                <DraggableItem
                  key={id}
                  position={position}
                  isDragging={draggingBlock?.id === id}
                  handleStartDrag={e => handleStartDrag(e.nativeEvent, block)}
                >
                  <WorkCardRegister
                    block={block}
                    resizingBlock={resizingBlock}
                    isDragging={false}
                    onDelete={() => removeWorkBlock(id)}
                    handleResizeStart={(e, block, direction) =>
                      handleResizeStart(e.nativeEvent, block, direction)
                    }
                    handleResizeEnd={handleResizeEnd}
                    containerRef={containerRef}
                    scrollOffset={scrollOffset}
                    allBlocks={workBlocks}
                    updateWorkBlocks={updateWorkBlocks}
                  />
                </DraggableItem>
              );
            })}
            <WorkCellsContainer
              selectedRecommendedWork={selectedRecommendedWork}
              workBlocks={workBlocks}
            />
          </div>
        </div>
        {draggingBlock && dragPointerPosition && (
          <DraggingItem
            position={{
              x: dragPointerPosition.x - dragOffset.x,
              y: dragPointerPosition.y - dragOffset.y,
            }}
          >
            <WorkCardRegister
              block={draggingBlock}
              isDragging={true}
              containerRef={containerRef}
              scrollOffset={scrollOffset}
              allBlocks={workBlocks}
              updateWorkBlocks={updateWorkBlocks}
            />
          </DraggingItem>
        )}
        {resizingBlock && (
          <DraggingItem
            position={{
              x: resizingBlock.position.x - scrollOffset,
              y: resizingBlock.position.y,
            }}
          >
            <WorkCardRegister
              block={resizingBlock}
              resizingBlock={resizingBlock}
              isDragging={false}
              containerRef={containerRef}
              scrollOffset={scrollOffset}
              allBlocks={workBlocks}
              handleResizeEnd={handleResizeEnd}
              updateWorkBlocks={updateWorkBlocks}
            />
          </DraggingItem>
        )}
      </DragContainer>

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
