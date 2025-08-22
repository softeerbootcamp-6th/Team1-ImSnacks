import type { CropNameType } from '@/types/crop.type';
import type { GetMyWorksOfTodayResponse } from '@/types/openapiGenerator';
import { sortWorkBlocks } from '@/pages/homePage/utils/work/sortWorkBlocks';
import dayjs from 'dayjs';

const getInitialWorkBlocks = (
  todayWorkScheduleData: GetMyWorksOfTodayResponse[]
) => {
  //현재 시 보다 늦게 끝나는 작업 일정만 렌더링
  const filteredWorkBlocks = todayWorkScheduleData.filter(work =>
    dayjs(work.endTime).isAfter(dayjs().set('minute', 0))
  );
  // WorkBlockType 형식으로 변환
  const processedWorkBlocks = filteredWorkBlocks.map(work => ({
    id: work.myWorkId ?? 0,
    cropName: work.myCropName as CropNameType,
    workName: work.myWorkName ?? '',
    workTime: work.workTime ?? '',
    startTime: work.startTime ?? '',
    endTime: work.endTime ?? '',
    position: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
  }));

  return sortWorkBlocks(processedWorkBlocks);
};

export default getInitialWorkBlocks;
