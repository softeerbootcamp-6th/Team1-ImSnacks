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
import S from './WorkContainer.style';
import { useWeatherGraphQuery } from '../../hooks/useWeatherGraphQuery';
import RegisterWorkContainer from '../registerWorkContainer/RegisterWorkContainer';
import { useRecommendedWorks } from '../../hooks/work/useRecommendedWorks';
import { useCreateWorkBlock } from '../../hooks/work/useCreateWorkBlock';
import { useDragBlock } from '@/components/dnd/hooks/useDragBlock';
import DragContainer from '@/components/dnd/dragContainer/DragContainer';
import { useResizeBlock } from '@/components/dnd/hooks/useResizeBlock';
import DraggableItem from '@/components/dnd/draggableItem/DraggableItem';
import DraggingItem from '@/components/dnd/draggingItem/DraggingItem';
import { useTimeStore } from '@/store/useTimeStore';
import { formatRelativeTime } from '@/utils/formatTimeUtil';

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

  return (
    <>
      <DragContainer containerRef={containerRef} css={S.ContainerWrapper}>
        <GraphMenu currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {graphData && !graphData?.isUpdated && (
          <p css={S.LastUpdateText}>
            마지막 업데이트{' '}
            {formatRelativeTime(graphData?.lastUpdateTime ?? '', currentTime)}
          </p>
        )}
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
        <div css={S.MaskGradientWrapper}>
          <div
            css={S.ScrollContainer}
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
