import type { Position } from '@/types/position.type';
import type { Size } from '@/types/size.type';

export interface BlockType {
  id: number;
  position: Position;
  size: Size;
}
