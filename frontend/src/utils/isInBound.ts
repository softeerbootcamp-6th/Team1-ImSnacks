import type { Position } from '@/lib/dnd/types/position.type';
import type { Size } from '@/lib/dnd/types/size.type';

interface BoundDirection {
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
}

const isInBound = (
  position: Position,
  block: { size: Size },
  scrollOffset: number,
  containerRect: HTMLDivElement | null,
  defaultPosition: Position,
  defaultPositionOffset: Position = { x: 0, y: 10 },
  { left = true, right = true, top = true, bottom = true }: BoundDirection = {}
): boolean => {
  if (!containerRect) return false;
  const { x, y } = position;
  const { width: itemWidth, height: itemHeight } = block.size;

  const isInBound =
    (left
      ? x >= defaultPosition.x - defaultPositionOffset.x + scrollOffset
      : true) &&
    (top ? y >= defaultPosition.y - defaultPositionOffset.y : true) &&
    (right
      ? x + itemWidth <= containerRect.clientWidth + scrollOffset
      : true) &&
    (bottom ? y + itemHeight <= containerRect.clientHeight : true);

  return isInBound;
};

export default isInBound;
