import { patchMyWorkTime } from '@/apis/myWork.api';
import type { WorkBlockType } from '@/types/workCard.type';

const updateBlockTimeOnServer = async (updatedBlock: WorkBlockType) => {
  try {
    await patchMyWorkTime({
      myWorkId: updatedBlock.id,
      startTime: updatedBlock.startTime,
      endTime: updatedBlock.endTime,
    });
  } catch (error) {
    console.error('작업 시간 업데이트 실패:', error);
  }
};

export default updateBlockTimeOnServer;
