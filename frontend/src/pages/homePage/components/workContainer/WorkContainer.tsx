import { useEffect, useState } from 'react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import useWorkBlocks from '@/pages/homePage/hooks/work/useWorkBlocks';
import MainGraph from '../mainGraph/MainGraph';
import GraphMenu from '../graphMenu/GraphMenu';
import { WEATHER_METRICS, type WeatherMetrics } from '@/types/weather.types';
import { WeatherRiskDto } from '@/types/openapiGenerator';
import { generateYTicks } from '../../utils/lineChartUtil';
import { getUnit } from '@/utils/getUnit';
import ChartS from '../mainLineChart/MainLineChart.style'; // TODO: 나중에 WorkContainer 스타일 정의 및 변경
import useContainer from '@/pages/homePage/hooks/useContainer';
import WorkContainerS from './WorkContainer.style';
import { useWeatherGraphQuery } from '../../hooks/useWeatherGraphQuery';
import { useRecommendedWorks } from '../../hooks/work/useRecommendedWorks';
import { useCreateWorkBlock } from '../../hooks/work/useCreateWorkBlock';
import { useDragBlock } from '@/components/dnd/hooks/useDragBlock';
import DragContainer from '@/components/dnd/dragContainer/DragContainer';
import { useResizeBlock } from '@/components/dnd/hooks/useResizeBlock';
import DraggableItem from '@/components/dnd/draggableItem/DraggableItem';
import DraggingItem from '@/components/dnd/draggingItem/DraggingItem';
import { useTimeStore } from '@/store/useTimeStore';
import type { RecommendedWorksResponse } from '@/types/openapiGenerator';
import RegisterWorkContainer from '../registerWorkContainer/RegisterWorkContainer';

const WorkContainer = ({
  weatherRiskData,
}: {
  weatherRiskData: WeatherRiskDto[];
}) => {
  const [currentTab, setCurrentTab] = useState<WeatherMetrics>(
    WEATHER_METRICS.PRECIPITATION
  );

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

  const { handleResize } = useResizeBlock(workBlocks, updateWorkBlocks);

  const { draggingBlock, pointerPosition, dragOffset, handleStartDrag } =
    useDragBlock({
      containerRef,
      scrollOffset,
      workBlocks,
      updateWorkBlocks,
    });

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
        css={WorkContainerS.ContainerWrapper}
        onDrop={handleContainerDrop}
        onDragOver={handleContainerDragOver}
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
            <MainGraph
              graphData={graphData}
              weatherRiskData={weatherRiskData}
            />

            {workBlocks.map(block => {
              const { id, position } = block;

              return (
                <DraggableItem
                  key={id}
                  position={position}
                  isDragging={draggingBlock?.id === id}
                  handleStartDrag={e => handleStartDrag(e.nativeEvent, block)}
                >
                  <WorkCardRegister
                    block={block}
                    isDragging={false}
                    onDelete={() => removeWorkBlock(id)}
                    onResize={updatedBlock =>
                      handleResize(updatedBlock.id, updatedBlock)
                    }
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
            />
          </div>
        </div>
        {draggingBlock && pointerPosition && (
          <DraggingItem
            position={{
              x: pointerPosition.x - dragOffset.x,
              y: pointerPosition.y - dragOffset.y,
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
