import { useEffect, useState } from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import { getMyWorkOfToday, deleteMyWork, postMyWork } from '@/apis/myWork.api';
import getInitialWorkBlocks from '@/pages/homePage/utils/work/getInitialWorkBlocks';
import useBlocksTransition from '@/components/dnd/hooks/useBlocksTransition';
import { sortWorkBlocks } from '../../utils/work/sortWorkBlocks';

const useWorkBlocks = () => {
  const [workBlocks, setWorkBlocks] = useState<WorkBlockType[]>([]);

  const { animateBlocksTransition } = useBlocksTransition(setWorkBlocks);

  useEffect(() => {
    const fetchMyWorkOfToday = async () => {
      const res = await getMyWorkOfToday(false);
      setWorkBlocks(getInitialWorkBlocks(res.data));
    };
    try {
      fetchMyWorkOfToday();
    } catch (error) {
      console.error('오늘 내 농작업 일정 조회 실패', error);
    }
  }, []);

  const addWorkBlock = async (
    newWorkBlock: WorkBlockType,
    myCropId: number,
    recommendedWorkId: number
  ) => {
    try {
      const newWorkIdRes = await postMyWork({
        startTime: newWorkBlock.startTime,
        endTime: newWorkBlock.endTime,
        myCropId,
        recommendedWorkId,
      });

      const newWorkId = newWorkIdRes.data.workId as number;

      animateBlocksTransition(
        workBlocks,
        sortWorkBlocks([...workBlocks, { ...newWorkBlock, id: newWorkId }])
      );
    } catch (error) {
      console.error('작업 추가 실패', error);
    }
  };

  const updateWorkBlocks = (updatedBlocks: WorkBlockType[]) => {
    setWorkBlocks(updatedBlocks);
  };

  const removeWorkBlock = async (id: number | string) => {
    try {
      await deleteMyWork({
        myWorkId: Number(id),
      });
      animateBlocksTransition(
        workBlocks,
        sortWorkBlocks(workBlocks.filter(block => block.id !== Number(id)))
      );
    } catch (error) {
      console.error('작업 삭제 실패', error);
    }
  };

  return {
    workBlocks,
    addWorkBlock,
    updateWorkBlocks,
    removeWorkBlock,
  };
};

export default useWorkBlocks;
