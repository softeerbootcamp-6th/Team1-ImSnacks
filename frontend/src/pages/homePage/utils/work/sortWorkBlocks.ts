import type { WorkBlockType } from '@/types/workCard.type';
import dayjs from 'dayjs';
import calculateTimeToPosition from './calculateTimeToPosition';
import isTimeOverlapping from '@/components/dnd/utils/isTimeOverlapping';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import type { CropNameType } from '@/types/crop.type';

export const sortWorkBlocks = (workBlocks: WorkBlockType[]) => {
  // 1. 시작 시간 기준 정렬
  const sortedWorks = [...workBlocks].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf()
  );

  // 2. 레이어별 작업 저장
  const layers: { [layer: number]: WorkBlockType[] } = { 1: [], 2: [], 3: [] };
  const blocks: WorkBlockType[] = [];

  for (const work of sortedWorks) {
    const { x, width } = calculateTimeToPosition(
      work.startTime ?? '',
      work.endTime ?? ''
    );

    // 3. 배정할 레이어 찾기
    const targetLayer =
      [1, 2, 3].find(layer => {
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
      }) ?? 1; // 모든 레이어가 겹치면 1층에 배정

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

  return blocks;
};
