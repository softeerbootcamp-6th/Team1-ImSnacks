import type { BlockType } from '@/lib/dnd/types/blockType.type';

export interface WorkBlockType extends BlockType {
  cropName: string;
  workName: string;
  workTime: string;
  startTime: string;
  endTime: string;
}
