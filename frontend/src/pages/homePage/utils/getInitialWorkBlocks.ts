import { WORK_SCHEDULE_DATA } from '@/constants/workScheduleData';
import { groupDataRecordStructure } from '@/utils/groupDataRecord';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import type { CropNameType } from '@/types/crop.type';
import { WORK_TIME_Y_COORDINATE } from '@/constants/workTimeCoordinate';

// 시간을 픽셀 위치로 변환하는 함수
export const calculateTimeToPosition = (startTime: string, endTime: string) => {
  const startDateTime = dayjs(startTime);
  const endDateTime = dayjs(endTime);

  // 시작 시간을 분으로 변환 (자정 기준)
  const startTotalMinutes = startDateTime.hour() * 60 + startDateTime.minute();
  const endTotalMinutes = endDateTime.hour() * 60 + endDateTime.minute();

  // 작업 시간의 길이 (분)
  const durationMinutes = endTotalMinutes - startTotalMinutes;

  // WorkCell 너비(92px) + gap(8px) = 100px, 1시간 = 60분
  const x = (startTotalMinutes / 60) * 100;
  const width = (durationMinutes / 60) * 100;

  return { x, width };
};

const getInitialWorkBlocks = (newWorkBlocks?: WorkBlockType[]) => {
  const blocks: WorkBlockType[] = [];

  const todayWorkScheduleData = newWorkBlocks
    ? newWorkBlocks
    : groupDataRecordStructure(WORK_SCHEDULE_DATA, 'date', 'workCardData')[
        dayjs(new Date()).format('YYYY-MM-DD')
      ] || [];

  const sortedWorks = [...todayWorkScheduleData].sort(
    (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf()
  );

  sortedWorks.forEach((work, index) => {
    // startTime과 endTime을 직접 사용하여 x 위치와 너비 계산
    const { x, width } = calculateTimeToPosition(work.startTime, work.endTime);

    // 이전 작업들과 겹치는지 확인하여 yLayer 결정
    let currentYLayer = 1;

    if (index > 0) {
      const previousWork = sortedWorks[index - 1];

      // 시간이 겹치는지 확인
      const workStart = dayjs(work.startTime).valueOf();
      const workEnd = dayjs(work.endTime).valueOf();
      const prevStart = dayjs(previousWork.startTime).valueOf();
      const prevEnd = dayjs(previousWork.endTime).valueOf();

      const isOverlapping = !(workStart >= prevEnd || workEnd <= prevStart);

      if (isOverlapping) {
        // 겹치는 경우, 이전 작업의 yLayer보다 큰 값 사용
        const previousBlock = blocks.find(
          block => block.id === previousWork.id
        );
        if (previousBlock) {
          const previousY = Number(previousBlock.position.y);
          const previousYLayer = Math.floor(previousY / 52) + 1;
          currentYLayer = Math.max(currentYLayer, previousYLayer);
        }
      }
    }

    // 안전한 y 좌표 계산
    const yCoordinate =
      WORK_TIME_Y_COORDINATE[currentYLayer as 1 | 2 | 3] ||
      WORK_TIME_Y_COORDINATE[1];

    blocks.push({
      id: work.id,
      cropName: work.cropName as CropNameType,
      workName: work.workName,
      workTime: work.workTime,
      startTime: work.startTime,
      endTime: work.endTime,
      position: { x, y: yCoordinate },
      size: { width, height: 52 },
    });
  });

  return blocks;
};

export default getInitialWorkBlocks;
