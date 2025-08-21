import type { CropNameType } from '@/types/crop.type';
import type { GetMyWorksOfTodayResponse } from '@/types/openapiGenerator';
import { sortWorkBlocks } from '@/pages/homePage/utils/work/sortWorkBlocks';

const getInitialWorkBlocks = (
  todayWorkScheduleData: GetMyWorksOfTodayResponse[]
) => {
  // WorkBlockType 형식으로 변환
  const processedWorkBlocks = todayWorkScheduleData.map(work => ({
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
