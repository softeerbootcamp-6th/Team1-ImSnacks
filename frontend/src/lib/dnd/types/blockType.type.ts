import type { Position } from '@/lib/dnd/types/position.type';
import type { Size } from '@/lib/dnd/types/size.type';

export interface BlockType {
  id: number;
  position: Position;
  size: Size;
}
