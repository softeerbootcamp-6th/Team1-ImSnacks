import { WORK_SCHEDULE_DATA } from '@/constants/workScheduleData';
import { groupDataRecordStructure } from '@/utils/groupDataRecord';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';

export const useInitialWorkBlocks = () => {
  const blocks: WorkBlockType[] = [];

  const todayWorkScheduleData =
    groupDataRecordStructure(WORK_SCHEDULE_DATA, 'date', 'workCardData')[
      dayjs(new Date()).format('YYYY-MM-DD')
    ] || [];

  todayWorkScheduleData.forEach(work => {
    // startTime과 endTime을 직접 사용하여 x 위치와 너비 계산
    const startDateTime = dayjs(work.startTime);
    const endDateTime = dayjs(work.endTime);

    // 시작 시간을 분으로 변환 (자정 기준)
    const startTotalMinutes =
      startDateTime.hour() * 60 + startDateTime.minute();
    const endTotalMinutes = endDateTime.hour() * 60 + endDateTime.minute();

    // 작업 시간의 길이 (분)
    const durationMinutes = endTotalMinutes - startTotalMinutes;

    // WorkCell 너비(92px) + gap(8px) = 100px, 1시간 = 60분
    const x = (startTotalMinutes / 60) * 100;
    const width = (durationMinutes / 60) * 100;

    blocks.push({
      id: work.id,
      cropName: work.cropName,
      workName: work.workName,
      workTime: work.workTime,
      startTime: work.startTime,
      endTime: work.endTime,
      position: { x, y: 50 }, // 기본 y 위치
      width,
    });
  });

  return blocks;
};
