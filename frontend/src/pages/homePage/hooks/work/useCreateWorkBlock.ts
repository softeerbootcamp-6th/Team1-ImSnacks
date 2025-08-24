import { useCallback } from 'react';
import dayjs from 'dayjs';
import type { WorkBlockType } from '@/types/workCard.type';
import type {
  MyCropResponse,
  RecommendedWorksResponse,
} from '@/types/openapiGenerator';
import { getYCoordinate, X_PX_PER_HOUR } from '@/constants/workTimeCoordinate';
import updateWorkTime from '@/pages/homePage/utils/work/updateWorkTime';
import { snapToGrid } from '@/utils/snapToGrid';

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
  addWorkBlock: (
    workBlock: WorkBlockType,
    myCropId: number,
    recommendedWorkId: number
  ) => void;
  workBlocks: WorkBlockType[];
}

export const useCreateWorkBlock = ({
  containerRef,
  addWorkBlock,
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

        // dropX를 10분 단위로 스냅
        const snappedDropX = snapToGrid(dropX);

        // 위치와 크기 설정 - y는 getYCoordinate(1)을 사용하여 유효한 y 좌표 설정
        const position = { x: snappedDropX, y: getYCoordinate(1) };
        const width = X_PX_PER_HOUR * 1.5;

        const {
          newStartTime: tempStartTime,
          newEndTime: tempEndTime,
          newWorkTime: tempWorkTime,
        } = updateWorkTime('', '', position, width);

        // 임시 블록 생성하여 겹침 검사용으로 사용
        const tempBlock: WorkBlockType = {
          id: dayjs().unix(),
          position,
          size: { width, height: 50 },
          cropName: selectedCrop.myCropName || '기본',
          workName: work.workName || '',
          workTime: tempWorkTime,
          startTime: tempStartTime,
          endTime: tempEndTime,
        };

        // updateWorkTime 함수를 사용하여 최종 시간 계산
        const {
          newStartTime: finalStartTime,
          newEndTime: finalEndTime,
          newWorkTime,
        } = updateWorkTime(tempBlock.startTime, tempBlock.endTime, position);

        // 최종 작업 블록 생성 및 시간 업데이트
        const newWorkBlock: WorkBlockType = {
          ...tempBlock,
          startTime: finalStartTime,
          endTime: finalEndTime,
          workTime: newWorkTime,
          position,
        };

        addWorkBlock(newWorkBlock, selectedCrop.myCropId!, work.workId!);
      } catch (error) {
        console.error('작업 블록 생성 실패:', error);
      }
    },
    [addWorkBlock, containerRef]
  );

  return {
    handleCreateWork,
  };
};
