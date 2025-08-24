import type { WorkBlockType } from '@/types/workCard.type';
import dayjs from 'dayjs';
import calculateTimeToPosition from './calculateTimeToPosition';
import isTimeOverlapping from '@/components/dnd/utils/isTimeOverlapping';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import type { CropNameType } from '@/types/crop.type';
import useMaxLayerStore from '@/store/useMaxLayerStore';

export const sortWorkBlocks = (workBlocks: WorkBlockType[]) => {
  // 1. 시작 시간 기준 정렬
  const sortedWorks = [...workBlocks].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf()
  );

  // 2. 레이어별 작업 저장
  const layers: { [layer: number]: WorkBlockType[] } = {};
  const blocks: WorkBlockType[] = [];

  // 현재 maxLayer 가져오기
  let currentMaxLayer = useMaxLayerStore.getState().maxLayer;

  for (const work of sortedWorks) {
    const { x, width } = calculateTimeToPosition(
      work.startTime ?? '',
      work.endTime ?? ''
    );

    // 3. 배정할 레이어 찾기
    const targetLayer =
      Array.from({ length: currentMaxLayer }, (_, index) => index + 1).find(
        layer => {
          // 레이어가 초기화되지 않았으면 빈 배열로 초기화
          if (!layers[layer]) {
            layers[layer] = [];
          }

          const layerWorks = layers[layer];
          return !layerWorks.some(w =>
            isTimeOverlapping(
              {
                startTime: work.startTime ?? '',
                endTime: work.endTime ?? '',
              },
              {
                startTime: w.startTime ?? '',
                endTime: w.endTime ?? '',
              }
            )
          );
        }
      ) ?? currentMaxLayer + 1;

    // 새로운 레이어가 필요한 경우
    if (targetLayer > currentMaxLayer) {
      currentMaxLayer = targetLayer;
    }

    // 레이어가 초기화되지 않았으면 초기화
    if (!layers[targetLayer]) {
      layers[targetLayer] = [];
    }
    // 4. 레이어에 작업 추가
    layers[targetLayer].push(work as WorkBlockType);

    // 5. 블록 생성
    blocks.push({
      id: work.id ?? 0,
      cropName: work.cropName as CropNameType,
      workName: work.workName ?? '',
      workTime: work.workTime ?? '',
      startTime: work.startTime ?? '',
      endTime: work.endTime ?? '',
      position: { x, y: getYCoordinate(targetLayer) },
      size: { width, height: 52 },
    });
  }

  const { updateMaxLayerFromWorkBlocks } = useMaxLayerStore.getState();
  updateMaxLayerFromWorkBlocks(blocks);

  return blocks;
};
