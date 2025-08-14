import type { Position, Size, WorkBlockType } from '@/types/workCard.type';
import { getYCoordinate } from '@/constants/workTimeCoordinate';

// 충돌 감지 함수
export const hasCollision = (
  currentBlock: { position: Position; size: Size },
  targetBlock: { position: Position; size: Size }
): boolean => {
  const currentCenterX = currentBlock.position.x + currentBlock.size.width / 2;
  const currentCenterY = currentBlock.position.y + currentBlock.size.height / 2;

  const targetCenterX = targetBlock.position.x + targetBlock.size.width / 2;
  const targetCenterY = targetBlock.position.y + targetBlock.size.height / 2;

  const distanceX = Math.abs(currentCenterX - targetCenterX);
  const distanceY = Math.abs(currentCenterY - targetCenterY);

  return (
    distanceX < currentBlock.size.width / 2 + targetBlock.size.width / 2 &&
    distanceY < currentBlock.size.height / 2 + targetBlock.size.height / 2
  );
};

// 컨테이너 경계 내부인지 확인하는 함수
export const isWithinBounds = (
  position: Position,
  size: Size,
  containerRect: DOMRect,
  scrollOffset: number
): boolean => {
  return (
    position.x >= 0 + scrollOffset &&
    position.y >= 0 &&
    position.x + size.width <= containerRect.width + scrollOffset &&
    position.y + size.height <= containerRect.height
  );
};

// 충돌하지 않는 위치를 찾는 함수
export const findCollisionFreePosition = (
  draggedBlock: WorkBlockType,
  otherBlocks: WorkBlockType[],
  containerRect: DOMRect,
  scrollOffset: number
): Position => {
  const { position, size } = draggedBlock;
  let offset = 0;
  const maxAttempts = 50;
  const yLayers = [1, 2, 3].map(layer => getYCoordinate(layer));

  for (let attempts = 0; attempts < maxAttempts; attempts++) {
    // y좌표는 3단계로 고정되어 있고 x좌표만 이동, y좌표 위에서부터 아래로 탐색
    for (const y of yLayers) {
      for (const dir of [offset, -offset]) {
        const testPosition = { x: position.x + dir, y };

        if (!isWithinBounds(testPosition, size, containerRect, scrollOffset)) {
          continue;
        }

        const collision = otherBlocks.some(block =>
          hasCollision({ ...draggedBlock, position: testPosition }, block)
        );

        if (!collision) return testPosition;
      }
    }
    offset += 10;
  }

  return position;
};
