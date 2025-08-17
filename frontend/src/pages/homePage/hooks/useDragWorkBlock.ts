import type { WorkBlockType, Position } from '@/types/workCard.type';
import { WORK_TIME_Y_COORDINATE } from '@/constants/workTimeCoordinate';
import { patchMyWork } from '@/apis/myWork.api';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDragAndDrop } from '@/hooks/dnd/useDragAndDrop';
import { useRevertPosition } from '@/hooks/dnd/useRevertPosition';
import useContainer from '../contexts/useContainer';
import useWorkBlocks from '../contexts/useWorkBlocks';
import {
  findFuturePosition,
  cleanupDragState,
  moveToValidPosition,
} from '../utils/workContainerUtils';
import { handleCollisionRevert } from '../utils/workContainerUtils';
import animateBlock from '@/utils/animateBlock';
import { hasCollisionWithOthers } from '@/utils/collisionUtils';

const useDragWorkBlock = () => {
  const { workBlocks, updateWorkBlocks } = useWorkBlocks();
  const { containerRef, scrollOffset } = useContainer();

  const [initialPosition, setInitialPosition] = useState<Position | null>(null);
  const [futurePosition, setFuturePosition] = useState<Position | null>(null);
  const latestBlocksRef = useRef<WorkBlockType[]>(workBlocks);
  const revertAnimationRef = useRef<number | null>(null);
  const [isRevertingItemId, setIsRevertingItemId] = useState<number | null>(
    null
  );

  // 드래그 중인 블록의 ID만 추적
  const [draggingBlockId, setDraggingBlockId] = useState<number | null>(null);

  useEffect(() => {
    latestBlocksRef.current = workBlocks;
  }, [workBlocks]);

  const {
    isDragging,
    startDrag,
    updatePosition,
    endDrag,
    isDraggingItem,
    draggedItemRef,
  } = useDragAndDrop<WorkBlockType>({
    getItemId: block => block.id,
    getItemPosition: block => block.position,
    onPositionChange: updated => {
      updateWorkBlocks(updated);

      // futurePosition 업데이트 - 충돌하지 않는 위치 계산
      const futurePosition = findFuturePosition(
        updated,
        draggingBlockId,
        containerRef,
        scrollOffset
      );
      if (futurePosition) {
        setFuturePosition(futurePosition);
      }
    },
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
  });

  const { checkAndRevert } = useRevertPosition<WorkBlockType>({
    draggedItem: draggedItemRef.current,
    initialPosition,
    getItemPosition: block => block.position,
    onRevert: () => {
      setIsRevertingItemId(draggedItemRef.current?.id || null);
      if (!draggedItemRef.current || !initialPosition) return;

      const revertId = draggedItemRef.current.id;
      const currentPos = draggedItemRef.current.position;

      animateBlock(
        revertAnimationRef,
        setIsRevertingItemId,
        latestBlocksRef,
        updateWorkBlocks,
        revertId as number,
        currentPos,
        initialPosition
      );
    },
  });

  const updateWorkTimeOnServer = async (
    draggingId: number,
    draggingBlock: WorkBlockType
  ) => {
    try {
      const finalBlock = workBlocks.find(block => block.id === draggingId);
      if (finalBlock) {
        const res = await patchMyWork({
          myWorkId: draggingId,
          startTime: finalBlock.startTime,
          endTime: finalBlock.endTime,
        });
        console.log(
          '시간 수정 후 작업 시간이 성공적으로 업데이트되었습니다:',
          finalBlock,
          res.data
        );
      }
    } catch (error) {
      console.error('작업 시간 업데이트 실패:', error);
      // 에러 발생 시 원래 위치로 되돌리기
      if (initialPosition) {
        animateBlock(
          revertAnimationRef,
          setIsRevertingItemId,
          latestBlocksRef,
          updateWorkBlocks,
          draggingId,
          draggingBlock.position,
          initialPosition
        );
      }
    }
  };

  const handleStartDrag = (e: React.MouseEvent, block: WorkBlockType) => {
    setInitialPosition(block.position);
    setDraggingBlockId(block.id);
    setFuturePosition(null);
    draggedItemRef.current = block;
    startDrag(e, block.id, workBlocks);
  };

  const handleEndDrag = async () => {
    const draggingId = draggingBlockId;
    if (draggingId !== null) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        checkAndRevert(rect, scrollOffset);
      }

      const draggingBlock = workBlocks.find(block => block.id === draggingId);
      if (draggingBlock) {
        // 다른 블록과의 충돌 검사
        const isCollision = hasCollisionWithOthers(
          draggingBlock,
          workBlocks,
          draggingId
        );

        if (isCollision) {
          handleCollisionRevert(
            draggingId,
            draggingBlock,
            futurePosition,
            initialPosition,
            revertAnimationRef,
            setIsRevertingItemId,
            latestBlocksRef,
            updateWorkBlocks
          );
          await updateWorkTimeOnServer(draggingId, draggingBlock);

          cleanupDragState(setDraggingBlockId, setFuturePosition, endDrag);
          return;
        }

        // 유효하지 않은 위치 검사 및 되돌리기
        moveToValidPosition(
          Object.values(WORK_TIME_Y_COORDINATE),
          draggingId,
          draggingBlock,
          revertAnimationRef,
          setIsRevertingItemId,
          latestBlocksRef,
          updateWorkBlocks
        );

        // 모든 valid 로직이 통과한 후 최종 시간으로 API 호출
        await updateWorkTimeOnServer(draggingId, draggingBlock);

        cleanupDragState(setDraggingBlockId, setFuturePosition, endDrag);
      }
    }

    cleanupDragState(setDraggingBlockId, setFuturePosition, endDrag);
  };

  const handleResize = (blockId: number, newBlock: WorkBlockType) => {
    if (draggingBlockId === blockId) {
      // 드래그 중일 때는 workBlocks를 직접 업데이트
      const updatedBlocks = workBlocks.map(b =>
        b.id === blockId ? newBlock : b
      );
      updateWorkBlocks(updatedBlocks);
    } else {
      // 드래그 중이 아닐 때는 즉시 업데이트
      const updatedBlocks = workBlocks.map(b =>
        b.id === blockId ? newBlock : b
      );
      updateWorkBlocks(updatedBlocks);
    }
  };

  return {
    handleStartDrag,
    handleEndDrag,
    handleResize,
    draggingBlockId,
    isRevertingItemId,
    initialPosition,
    futurePosition,
    revertAnimationRef,
    isDragging,
    updatePosition,
    isDraggingItem,
  };
};

export default useDragWorkBlock;
