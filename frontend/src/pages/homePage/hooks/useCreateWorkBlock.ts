import { useCallback } from 'react';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import type {
  MyCropResponse,
  RecommendedWorksResponse,
} from '@/types/openapiGenerator';
import calculateTimeToPosition from '../utils/calculateTimeToPosition';
import { getYCoordinate } from '@/constants/workTimeCoordinate';
import { findCollisionFreePosition } from '@/utils/collisionUtils';
import updateBlockWorkTime from '@/pages/homePage/utils/updateBlockWorkTime';
import useContainer from '@/pages/homePage/contexts/useContainer';
import useWorkBlocks from '@/pages/homePage/contexts/useWorkBlocks';
import { postMyWork } from '@/apis/myWork.api';

interface UseCreateWorkBlockReturn {
  handleCreateWork: (
    work: RecommendedWorksResponse,
    selectedCrop: MyCropResponse
  ) => Promise<void>;
}

export const useCreateWorkBlock = (): UseCreateWorkBlockReturn => {
  const { containerRef, scrollOffset } = useContainer();
  const { addWorkBlock, workBlocks } = useWorkBlocks();

  const handleCreateWork = useCallback(
    async (work: RecommendedWorksResponse, selectedCrop: MyCropResponse) => {
      try {
        // 시작 시간과 종료 시간 계산
        const newStartTime = dayjs(work.startTime);
        const newEndTime = dayjs(work.startTime).add(2, 'hour');

        // 위치와 크기 계산
        const { x, width } = calculateTimeToPosition(
          newStartTime.format('YYYY-MM-DD HH:mm:ss'),
          newEndTime.format('YYYY-MM-DD HH:mm:ss')
        );

        // 컨테이너 정보 가져오기
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) {
          console.warn('Container rect not available');
          return;
        }

        // 임시 블록 생성하여 겹침 검사용으로 사용
        const tempBlock: WorkBlockType = {
          id: dayjs().unix(),
          position: { x, y: getYCoordinate(1) },
          size: { width, height: 50 },
          cropName: selectedCrop.myCropName || '기본',
          workName: work.workName || '',
          workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
            'HH:mm'
          )}`,
          startTime: newStartTime.format('YYYY-MM-DD HH:mm:ss'),
          endTime: newEndTime.format('YYYY-MM-DD HH:mm:ss'),
        };

        // 충돌하지 않는 위치 찾기
        const collisionFreePosition = findCollisionFreePosition(
          tempBlock,
          workBlocks,
          containerRect,
          scrollOffset
        );

        // 최종 작업 블록 생성 및 시간 업데이트
        const newWorkBlock: WorkBlockType = updateBlockWorkTime(
          tempBlock,
          collisionFreePosition,
          100
        );

        // API 호출하여 새로운 작업 생성
        const newWorkIdRes = await postMyWork({
          startTime: newWorkBlock.startTime,
          endTime: newWorkBlock.endTime,
          myCropId: selectedCrop.myCropId,
          recommendedWorkId: work.workId,
        });

        const newWorkId = newWorkIdRes.data.workId as number;

        addWorkBlock({ ...newWorkBlock, id: newWorkId });
      } catch (error) {
        console.error('작업 블록 생성 실패:', error);
      }
    },
    [addWorkBlock, workBlocks, containerRef, scrollOffset]
  );

  return {
    handleCreateWork,
  };
};
