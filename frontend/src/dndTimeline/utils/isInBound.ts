import type { Position, Size } from '@/types/workCard.type';

const isInBound = (
  position: Position,
  block: { size: Size },
  scrollOffset: number,
  containerRect: HTMLDivElement | null,
  defaultPosition: Position,
  defaultPositionOffset: Position = { x: 0, y: 10 }
): boolean => {
  if (!containerRect) return false;
  const { x, y } = position;
  const { width: itemWidth, height: itemHeight } = block.size;

  const isInBound =
    x >= defaultPosition.x - defaultPositionOffset.x + scrollOffset &&
    y >= defaultPosition.y - defaultPositionOffset.y &&
    x + itemWidth <= containerRect.clientWidth + scrollOffset &&
    y + itemHeight <= containerRect.clientHeight;

  return isInBound;
};

export default isInBound;
