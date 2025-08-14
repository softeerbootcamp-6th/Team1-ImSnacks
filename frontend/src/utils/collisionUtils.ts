import type { Position, Size, WorkBlockType } from '@/types/workCard.type';

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
  let newPosition = { ...position };

  // 다른 블록들과의 충돌 검사
  const hasCollisionWithOthers = otherBlocks.some(block =>
    hasCollision(draggedBlock, block)
  );

  if (hasCollisionWithOthers) {
    // 충돌이 있으면 가장 가까운 충돌하지 않는 위치 찾기
    let offset = 10; // 10px씩 이동
    const maxAttempts = 50; // 최대 시도 횟수
    let attempts = 0;

    while (hasCollisionWithOthers && attempts < maxAttempts) {
      // 여러 방향으로 시도
      const directions = [
        { x: offset, y: 0 }, // 오른쪽
        { x: -offset, y: 0 }, // 왼쪽
        { x: 0, y: offset }, // 아래
        { x: 0, y: -offset }, // 위
      ];

      for (const direction of directions) {
        const testPosition = {
          x: position.x + direction.x,
          y: position.y + direction.y,
        };

        // 컨테이너 경계 내부인지 확인
        if (!isWithinBounds(testPosition, size, containerRect, scrollOffset)) {
          continue; // 경계를 벗어나면 다음 방향 시도
        }

        // 테스트 위치에서 충돌 검사
        const testBlock = { ...draggedBlock, position: testPosition };
        const testHasCollision = otherBlocks.some(block =>
          hasCollision(testBlock, block)
        );

        if (!testHasCollision) {
          newPosition = testPosition;
          return newPosition;
        }
      }

      offset += 10;
      attempts++;
    }
  }

  return newPosition;
};
