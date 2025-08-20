import type { Position } from './position.type';
import type { Size } from '@/types/workCard.type';

export interface BlockType {
  id: string | number;
  position: Position;
  size: Size;
}
