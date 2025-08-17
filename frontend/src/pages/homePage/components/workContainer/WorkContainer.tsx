import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import WorkCellsContainer from '../workCellsContainer/WorkCellsContainer';
import WorkCardRegister from '../workCardRegister/WorkCardRegister';
import updateBlockWorkTime from '@/pages/homePage/utils/updateBlockWorkTime';
import useWorkBlocks from '@/pages/homePage/contexts/useWorkBlocks';
import DragOverlay from '@/components/dnd/DragOverlay';
import DragOverlayStyle from '@/components/dnd/DragOverlay.style';

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
import useDragWorkBlock from '@/pages/homePage/hooks/useDragWorkBlock';

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

  const {
    handleStartDrag,
    handleEndDrag,
    handleResize,
    draggingBlockId,
    isRevertingItemId,
    isDragging,
    updatePosition,
    isDraggingItem,
  } = useDragWorkBlock();

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
