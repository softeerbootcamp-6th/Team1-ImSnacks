import { useState } from 'react';
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
import { useWeatherGraphQuery } from '../../hooks/useWeatherGraphQuery';
import RegisterWorkContainer from '../registerWorkContainer/RegisterWorkContainer';
import { useRecommendedWorks } from '../../hooks/useRecommendedWorks';
import { useCreateWorkBlock } from '../../hooks/useCreateWorkBlock';
import { useDragBlock } from '@/hooks/useDragBlock';
import DragContainer from '@/components/dnd/dragContainer/DragContainer';
import { useResizeBlock } from '@/hooks/useResizeBlock';
import DraggableItem from '@/components/dnd/draggableItem/DraggableItem';
import DraggingItem from '@/components/dnd/draggingItem/DraggingItem';

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
      <DragContainer
        containerRef={containerRef}
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
