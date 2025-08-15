import { WORK_SCHEDULE_DATA } from '@/constants/workScheduleData';
import { groupDataRecordStructure } from '@/utils/groupDataRecord';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import type { CropNameType } from '@/types/crop.type';
import { getYCoordinate } from '@/constants/workTimeCoordinate';

// 시간을 픽셀 위치로 변환하는 함수
export const calculateTimeToPosition = (startTime: string, endTime: string) => {
  const startDateTime = dayjs(startTime);
  const endDateTime = dayjs(endTime);
  const now = dayjs();

  // 현재 시간을 기준으로 시작 시간의 상대적 위치 계산
  // 현재 시간을 0으로 설정하고, 그 이전 시간은 음수, 이후 시간은 양수
  const currentHour = now.hour();
  const currentMinute = now.minute();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // 시작 시간을 분으로 변환 (날짜가 다른 경우 고려)
  const startTotalMinutes = startDateTime.hour() * 60 + startDateTime.minute();

  // 종료 시간을 분으로 변환 (날짜가 다른 경우 고려)
  let endTotalMinutes = endDateTime.hour() * 60 + endDateTime.minute();

  // 만약 종료 시간이 시작 시간보다 작다면 (다음날로 넘어가는 경우)
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60; // 24시간(1440분) 추가
  }

  // 작업 시간의 길이 (분)
  const durationMinutes = endTotalMinutes - startTotalMinutes;

  // 현재 시간을 기준으로 한 상대적 위치 계산
  // WorkCell 너비(92px) + gap(8px) = 100px, 1시간 = 60분
  const relativeMinutes = startTotalMinutes - currentTotalMinutes;
  const x = (relativeMinutes / 60) * 100;
  const width = (durationMinutes / 60) * 100;

  return { x, width };
};

const getTodayWorkBlocks = (newWorkBlocks?: WorkBlockType[]) => {
  const todayKey = dayjs().format('YYYY-MM-DD');
  const todayWorkScheduleData =
    newWorkBlocks ??
    groupDataRecordStructure(WORK_SCHEDULE_DATA, 'date', 'workCardData')[
      todayKey
    ] ??
    [];
  return todayWorkScheduleData;
};

export const getInitialWorkBlocks = (newWorkBlocks?: WorkBlockType[]) => {
  // 1. 오늘 작업 데이터 가져오기
  const todayWorkScheduleData = getTodayWorkBlocks(newWorkBlocks);

  // 2. 시작 시간 기준 정렬
  const sortedWorks = [...todayWorkScheduleData].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf()
  );

  // 3. 레이어별 작업 저장
  const layers: { [layer: number]: WorkBlockType[] } = { 1: [], 2: [], 3: [] };
  const blocks: WorkBlockType[] = [];

  for (const work of sortedWorks) {
    const { x, width } = calculateTimeToPosition(work.startTime, work.endTime);

    // 4. 배정할 레이어 찾기
    const targetLayer =
      [1, 2, 3].find(layer => {
        const layerWorks = layers[layer];
        return !layerWorks.some(w => isTimeOverlapping(work, w));
      }) ?? 1; // 모든 레이어가 겹치면 1층에 배정

    // 5. 레이어에 작업 추가
    layers[targetLayer].push(work as WorkBlockType);

    // 6. 블록 생성
    blocks.push({
      id: work.id,
      cropName: work.cropName as CropNameType,
      workName: work.workName,
      workTime: work.workTime,
      startTime: work.startTime,
      endTime: work.endTime,
      position: { x, y: getYCoordinate(targetLayer) },
      size: { width, height: 52 },
    });
  }

  return blocks;
};

// 시간 겹침 여부 체크
const isTimeOverlapping = (
  a: { startTime: string; endTime: string },
  b: { startTime: string; endTime: string }
) => {
  const startA = dayjs(a.startTime).valueOf();
  const endA = dayjs(a.endTime).valueOf();
  const startB = dayjs(b.startTime).valueOf();
  const endB = dayjs(b.endTime).valueOf();
  return !(startA >= endB || endA <= startB);
};

export default getInitialWorkBlocks;
