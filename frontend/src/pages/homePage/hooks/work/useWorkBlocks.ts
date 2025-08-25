import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { WorkBlockType } from '@/types/workCard.type';
import { getMyWorkOfToday, deleteMyWork, postMyWork } from '@/apis/myWork.api';
import getInitialWorkBlocks from '@/pages/homePage/utils/work/getInitialWorkBlocks';
import useBlocksTransition from '@/lib/dnd/hooks/useBlocksTransition';
import { sortWorkBlocks } from '../../utils/work/sortWorkBlocks';
import { useTimeStore } from '@/store/useTimeStore';

const useWorkBlocks = () => {
  const { currentTime } = useTimeStore();
  const [workBlocks, setWorkBlocks] = useState<WorkBlockType[]>([]);
  const queryClient = useQueryClient();
  const { animateBlocksTransition } = useBlocksTransition(setWorkBlocks);

  const { data, refetch } = useQuery({
    queryKey: ['myWorkOfToday'],
    queryFn: async () => {
      const res = await getMyWorkOfToday(false);
      return getInitialWorkBlocks(res.data);
    },
    staleTime: 55 * 60 * 1000,
  });

  const prevWorkBlocksRef = useRef<WorkBlockType[]>([]);
  const skipAnimationRef = useRef(false);

  useEffect(() => {
    if (!data) return;
    const sortedBlocks = sortWorkBlocks(data);
    if (skipAnimationRef.current) {
      setWorkBlocks(sortedBlocks);
      prevWorkBlocksRef.current = sortedBlocks;
      skipAnimationRef.current = false;
      return;
    }
    animateBlocksTransition(prevWorkBlocksRef.current, sortedBlocks);
    prevWorkBlocksRef.current = sortedBlocks;
  }, [data, animateBlocksTransition]);

  useEffect(() => {
    if (currentTime.minute() === 0) {
      // refetch 시에는 애니메이션 허용
      skipAnimationRef.current = false;
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

      //캐싱 무효화 후 refetch 시 애니메이션 적용 x
      skipAnimationRef.current = true;

      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['myWorkOfToday'] });
      }, 1000);
    } catch (error) {
      console.error('작업 추가 실패', error);
    }
  };

  const updateWorkBlocks = (updatedBlocks: WorkBlockType[]) => {
    setWorkBlocks(updatedBlocks);
    skipAnimationRef.current = true;
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

      //캐싱 무효화 후 refetch 시 애니메이션 적용 x
      skipAnimationRef.current = true;
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['myWorkOfToday'] });
      }, 1000);
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
