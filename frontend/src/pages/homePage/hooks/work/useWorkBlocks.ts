import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { WorkBlockType } from '@/types/workCard.type';
import { getMyWorkOfToday, deleteMyWork, postMyWork } from '@/apis/myWork.api';
import getInitialWorkBlocks from '@/pages/homePage/utils/work/getInitialWorkBlocks';
import useBlocksTransition from '@/components/dnd/hooks/useBlocksTransition';
import { sortWorkBlocks } from '../../utils/work/sortWorkBlocks';
import { useTimeStore } from '@/store/useTimeStore';

const useWorkBlocks = () => {
  const { currentTime } = useTimeStore();
  const [workBlocks, setWorkBlocks] = useState<WorkBlockType[]>([]);

  const { animateBlocksTransition } = useBlocksTransition(setWorkBlocks);

  const {
    data: initialWorkBlocks,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['myWorkOfToday'],
    queryFn: async () => {
      const res = await getMyWorkOfToday(false);
      return getInitialWorkBlocks(res.data);
    },
    staleTime: 55 * 60 * 1000,
  });

  const prevWorkBlocksRef = useRef<WorkBlockType[]>([]);

  useEffect(() => {
    if (initialWorkBlocks) {
      const sortedBlocks = sortWorkBlocks(initialWorkBlocks);
      animateBlocksTransition(prevWorkBlocksRef.current, sortedBlocks);
      prevWorkBlocksRef.current = sortedBlocks;
    }
  }, [initialWorkBlocks, animateBlocksTransition]);

  useEffect(() => {
    if (currentTime.minute() === 0) {
      refetch();
    }
  }, [currentTime, refetch]);

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
    isLoading,
    error,
    addWorkBlock,
    updateWorkBlocks,
    removeWorkBlock,
  };
};

export default useWorkBlocks;
