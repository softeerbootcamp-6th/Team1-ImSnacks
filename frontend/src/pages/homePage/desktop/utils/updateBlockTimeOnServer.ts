import { patchMyWorkTime } from '@/apis/myWork.api';
import type { WorkBlockType } from '@/types/workCard.type';
import { QueryClient } from '@tanstack/react-query';

const updateBlockTimeOnServer = async (
  updatedBlock: WorkBlockType,
  queryClient: QueryClient
) => {
  try {
    await patchMyWorkTime({
      myWorkId: updatedBlock.id,
      startTime: updatedBlock.startTime,
      endTime: updatedBlock.endTime,
    });
  } catch (error) {
    console.error('작업 시간 업데이트 실패:', error);
  }
  setTimeout(() => {
    queryClient.invalidateQueries({ queryKey: ['myWorkOfToday'] });
  }, 1000);
};

export default updateBlockTimeOnServer;
