import type { Position, Size } from '@/types/workCard.type';

const isInBound = (
  position: Position,
  block: { size: Size },
  scrollOffset: number,
  containerRect: HTMLDivElement | null,
  defaultPosition: Position
): boolean => {
  if (!containerRect) return false;
  const { x, y } = position;
  const itemWidth = block.size.width;
  const itemHeight = block.size.height;

  const isInBound =
    x >= defaultPosition.x + scrollOffset &&
    y >= defaultPosition.y &&
    x + itemWidth <= containerRect.clientWidth + scrollOffset &&
    y + itemHeight <= containerRect.clientHeight;

  return isInBound;
};

export default isInBound;
