import { useCallback } from 'react';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import type {
  MyCropResponse,
  RecommendedWorksResponse,
} from '@/types/openapiGenerator';
import { getYCoordinate, X_PX_PER_HOUR } from '@/constants/workTimeCoordinate';
import { findCollisionFreePosition } from '@/components/dnd/utils/collisionUtils';
import updateWorkTimeByPos from '@/pages/homePage/utils/work/updateWorkTimeByPos';
import { postMyWork } from '@/apis/myWork.api';

interface UseCreateWorkBlockReturn {
  handleCreateWork: (
    work: RecommendedWorksResponse,
    selectedCrop: MyCropResponse,
    dropX?: number
  ) => Promise<void>;
}

interface UseCreateWorkBlockProps {
  containerRef: React.RefObject<HTMLDivElement> | null;
  scrollOffset: number;
  addWorkBlock: (workBlock: WorkBlockType) => void;
  workBlocks: WorkBlockType[];
}

export const useCreateWorkBlock = ({
  containerRef,
  scrollOffset,
  addWorkBlock,
  workBlocks,
}: UseCreateWorkBlockProps): UseCreateWorkBlockReturn => {
  const handleCreateWork = useCallback(
    async (
      work: RecommendedWorksResponse,
      selectedCrop: MyCropResponse,
      dropX?: number
    ) => {
      try {
        // 컨테이너 정보 가져오기
        const containerRect = containerRef?.current?.getBoundingClientRect();
        if (!containerRect || !dropX) return;

        // x좌표를 시간으로 변환하여 시작 시간 계산
        const timeByPosition = (dropX - scrollOffset) / X_PX_PER_HOUR;
        const baseDateTime = dayjs()
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0);

        const newStartTime = baseDateTime.add(timeByPosition, 'hour');
        const newEndTime = newStartTime.add(1, 'hour'); // TODO: 2시간으로 변경

        // 위치와 크기 설정 - y는 getYCoordinate(1)을 사용하여 유효한 y 좌표 설정
        const position = { x: dropX, y: getYCoordinate(1) };
        const width = X_PX_PER_HOUR * 1;

        // 임시 블록 생성하여 겹침 검사용으로 사용
        const tempBlock: WorkBlockType = {
          id: dayjs().unix(),
          position,
          size: { width, height: 50 },
          cropName: selectedCrop.myCropName || '기본',
          workName: work.workName || '',
          workTime: `${newStartTime.format('HH:mm')} - ${newEndTime.format(
            'HH:mm'
          )}`,
          startTime: newStartTime.format('YYYY-MM-DDTHH:mm:ss'),
          endTime: newEndTime.format('YYYY-MM-DDTHH:mm:ss'),
        };

        // 충돌하지 않는 위치 찾기
        const collisionFreePosition = findCollisionFreePosition(
          tempBlock,
          workBlocks,
          containerRect,
          scrollOffset
        );

        // updateWorkTimeByPos 함수를 사용하여 최종 시간 계산
        const {
          newStartTime: finalStartTime,
          newEndTime: finalEndTime,
          newWorkTime,
        } = updateWorkTimeByPos(
          tempBlock.startTime,
          tempBlock.endTime,
          collisionFreePosition
        );

        // 최종 작업 블록 생성 및 시간 업데이트
        const newWorkBlock: WorkBlockType = {
          ...tempBlock,
          startTime: finalStartTime,
          endTime: finalEndTime,
          workTime: newWorkTime,
          position: collisionFreePosition,
        };

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
