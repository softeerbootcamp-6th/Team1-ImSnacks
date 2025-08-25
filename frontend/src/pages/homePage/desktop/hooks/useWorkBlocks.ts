import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { WorkBlockType } from '@/types/workCard.type';
import {
  getMyWorkOfToday,
  deleteMyWork,
  postMyWork,
  patchMyWorkTime,
} from '@/apis/myWork.api';
import getInitialWorkBlocks from '@/pages/homePage/desktop/utils/getInitialWorkBlocksUtil';
import useBlocksTransition from '@/lib/dnd/hooks/useBlocksTransition';
import { sortWorkBlocks } from '@/pages/homePage/desktop/utils/sortWorkBlocksUtil';
import { useTimeStore } from '@/store/useTimeStore';

const QUERY_KEY = ['myWorkOfToday'];
const ANIMATION_DELAY = 1000;

const useWorkBlocks = () => {
  const { currentTime } = useTimeStore();
  const [workBlocks, setWorkBlocks] = useState<WorkBlockType[]>([]);
  const queryClient = useQueryClient();
  const { animateBlocksTransition } = useBlocksTransition(setWorkBlocks);

  const prevWorkBlocksRef = useRef<WorkBlockType[]>([]);
  const skipAnimationRef = useRef(false);

  const { data, refetch } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await getMyWorkOfToday(false);
      return getInitialWorkBlocks(res.data);
    },
    staleTime: 55 * 60 * 1000,
  });

  const invalidateMyWorkQuery = useCallback(() => {
    skipAnimationRef.current = true;
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    }, ANIMATION_DELAY);
  }, [queryClient]);

  const updateBlocksWithAnimation = useCallback(
    (newBlocks: WorkBlockType[]) => {
      const sorted = sortWorkBlocks(newBlocks);
      animateBlocksTransition(workBlocks, sorted);
    },
    [animateBlocksTransition, workBlocks]
  );

  useEffect(() => {
    if (!data) return;

    const sortedBlocks = sortWorkBlocks(data);
    if (skipAnimationRef.current) {
      setWorkBlocks(sortedBlocks);
      prevWorkBlocksRef.current = sortedBlocks;
      skipAnimationRef.current = false;
    } else {
      animateBlocksTransition(prevWorkBlocksRef.current, sortedBlocks);
      prevWorkBlocksRef.current = sortedBlocks;
    }
  }, [data, animateBlocksTransition]);

  const refetchOnTime = useCallback(() => {
    if (currentTime.minute() === 0) {
      skipAnimationRef.current = false;
      refetch();
    }
  }, [currentTime, refetch]);

  useEffect(() => {
    refetchOnTime();
  }, [refetchOnTime]);

  const addWorkBlock = useCallback(
    async (
      newWorkBlock: WorkBlockType,
      myCropId: number,
      recommendedWorkId: number
    ) => {
      try {
        const { data } = await postMyWork({
          startTime: newWorkBlock.startTime,
          endTime: newWorkBlock.endTime,
          myCropId,
          recommendedWorkId,
        });

        const newWorkId = data.workId as number;
        updateBlocksWithAnimation([
          ...workBlocks,
          { ...newWorkBlock, id: newWorkId },
        ]);

        invalidateMyWorkQuery();
      } catch (error) {
        console.error('작업 추가 실패:', error);
      }
    },
    [workBlocks, updateBlocksWithAnimation, invalidateMyWorkQuery]
  );

  const updateWorkBlockTimeOnServer = useCallback(
    async (updatedBlock: WorkBlockType) => {
      try {
        await patchMyWorkTime({
          myWorkId: updatedBlock.id,
          startTime: updatedBlock.startTime,
          endTime: updatedBlock.endTime,
        });
        invalidateMyWorkQuery();
      } catch (error) {
        console.error('작업 시간 업데이트 실패:', error);
      }
    },
    [invalidateMyWorkQuery]
  );

  const updateWorkBlocks = useCallback((updatedBlocks: WorkBlockType[]) => {
    setWorkBlocks(updatedBlocks);
    skipAnimationRef.current = true;
  }, []);

  const removeWorkBlock = useCallback(
    async (id: number | string) => {
      try {
        await deleteMyWork({ myWorkId: Number(id) });
        updateBlocksWithAnimation(
          workBlocks.filter(block => block.id !== Number(id))
        );
        invalidateMyWorkQuery();
      } catch (error) {
        console.error('작업 삭제 실패:', error);
      }
    },
    [workBlocks, updateBlocksWithAnimation, invalidateMyWorkQuery]
  );

  return {
    workBlocks,
    addWorkBlock,
    updateWorkBlocks,
    removeWorkBlock,
    updateWorkBlockTimeOnServer,
  };
};

export default useWorkBlocks;
