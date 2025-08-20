import {
  useState,
  useCallback,
  useEffect,
  useRef,
  type RefObject,
} from 'react';
import type { WorkBlockType } from '@/types/workCard.type';
import updateWorkTimeByPos from '@/dndTimeline/utils/updateWorkTimeByPos';
import { sortWorkBlocks } from '@/pages/homePage/utils/sortWorkBlocks';
import type { Position } from '@/dndTimeline/types/position.type';

interface UseDragBlockProps {
  containerRef: RefObject<HTMLDivElement | null>;
  scrollOffset: number;
  workBlocks: WorkBlockType[];
  updateWorkBlocks: (blocks: WorkBlockType[]) => void;
}

export const useDragBlock = ({
  containerRef,
  scrollOffset,
  workBlocks,
  updateWorkBlocks,
}: UseDragBlockProps) => {
  const [draggingBlock, setDraggingBlock] = useState<WorkBlockType | null>(
    null
  );
  const [dragPosition, setDragPosition] = useState<Position | null>(null);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });

  // 정렬 전이 애니메이션 timeout id
  const sortAnimationTimeoutRef = useRef<number | null>(null);

  const animateBlocksTransition = useCallback(
    (
      prevBlocks: WorkBlockType[],
      nextBlocks: WorkBlockType[],
      durationMs = 250
    ) => {
      if (sortAnimationTimeoutRef.current !== null) {
        clearTimeout(sortAnimationTimeoutRef.current);
        sortAnimationTimeoutRef.current = null;
      }

      const start = performance.now();
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const fromMap = new Map<number, WorkBlockType>();
      prevBlocks.forEach(b => fromMap.set(Number(b.id), b));

      const step = () => {
        const now = performance.now();
        const elapsed = now - start;
        const t = Math.min(1, elapsed / durationMs);
        const eased = easeOutCubic(t);

        const frameBlocks: WorkBlockType[] = nextBlocks.map(toBlock => {
          const id = Number(toBlock.id);
          const fromBlock = fromMap.get(id);
          if (!fromBlock) return toBlock;

          const fromX = fromBlock.position.x;
          const fromY = fromBlock.position.y;
          const fromW = fromBlock.size.width ?? 0;
          const toX = toBlock.position.x;
          const toY = toBlock.position.y;
          const toW = toBlock.size.width ?? 0;

          const x = fromX + (toX - fromX) * eased;
          const y = fromY + (toY - fromY) * eased;
          const width = fromW + (toW - fromW) * eased;

          return {
            ...toBlock,
            position: { x, y },
            size: { ...toBlock.size, width },
          } as WorkBlockType;
        });

        updateWorkBlocks(frameBlocks);

        if (t < 1) {
          sortAnimationTimeoutRef.current = window.setTimeout(step, 16);
        } else {
          sortAnimationTimeoutRef.current = null;

          updateWorkBlocks(nextBlocks);
        }
      };

      // 즉시 1프레임 수행
      step();
    },
    [updateWorkBlocks]
  );

  const getContainerCoords = useCallback(
    (e: PointerEvent) => {
      if (!containerRef.current) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    [containerRef]
  );

  const handleStartDrag = useCallback(
    (e: PointerEvent, block: WorkBlockType) => {
      const containerCoords = getContainerCoords(e);
      const rect = containerRef.current?.getBoundingClientRect();

      setDragOffset({
        x: e.clientX - (rect?.left ?? 0) + scrollOffset - block.position.x,
        y: e.clientY - (rect?.top ?? 0) - block.position.y,
      });

      setDraggingBlock(block);
      setDragPosition(containerCoords);
    },
    [containerRef, getContainerCoords, scrollOffset]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!draggingBlock) return;

      const containerCoords = getContainerCoords(e);
      setDragPosition(containerCoords);

      const newX = containerCoords.x + scrollOffset - dragOffset.x;
      const newY = containerCoords.y - dragOffset.y;
      const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
        draggingBlock.startTime,
        draggingBlock.endTime,
        { x: newX, y: newY }
      );

      setDraggingBlock({
        ...draggingBlock,
        position: { x: newX, y: newY },
        startTime: newStartTime,
        endTime: newEndTime,
        workTime: newWorkTime,
      });
    },
    [draggingBlock, dragOffset, getContainerCoords, scrollOffset]
  );

  const handleEndDrag = useCallback(() => {
    if (!draggingBlock) return;

    const newBlocks = workBlocks.map(block => {
      const newBlockPosition = {
        x: draggingBlock.position.x,
        y: draggingBlock.position.y,
      };
      const { newStartTime, newEndTime, newWorkTime } = updateWorkTimeByPos(
        block.startTime,
        block.endTime,
        newBlockPosition
      );

      return block.id === draggingBlock.id
        ? {
            ...block,
            position: newBlockPosition,
            startTime: newStartTime,
            endTime: newEndTime,
            workTime: newWorkTime,
          }
        : block;
    });

    const newSortedBlocks = sortWorkBlocks(newBlocks);

    // 변경 여부 확인 후 전이 애니메이션 적용 (드래깅하던 위치를 기준으로 비교)
    const changed = newBlocks.some(prev => {
      const next = newSortedBlocks.find(b => b.id === prev.id);
      if (!next) return false;
      return (
        prev.position.x !== next.position.x ||
        prev.position.y !== next.position.y ||
        (prev.size.width ?? 0) !== (next.size.width ?? 0)
      );
    });

    if (changed) {
      // 드래깅하던 아이템은 드래깅 종료 위치에서 정렬 위치로 이동
      animateBlocksTransition(newBlocks, newSortedBlocks);
    } else {
      updateWorkBlocks(newSortedBlocks);
    }

    setDraggingBlock(null);
    setDragPosition(null);
  }, [animateBlocksTransition, draggingBlock, updateWorkBlocks, workBlocks]);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handleEndDrag);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handleEndDrag);
    };
  }, [handlePointerMove, handleEndDrag]);

  return {
    draggingBlock,
    dragPosition,
    dragOffset,
    handleStartDrag,
  };
};
