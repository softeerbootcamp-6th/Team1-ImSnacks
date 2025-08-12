export interface WorkCardType {
  id: number;
  cropName: string;
  workName: string;
  workTime: string;
  isCompleted: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface WorkBlockType {
  id: number;
  cropName: string;
  workName: string;
  workTime: string;
  startTime: string;
  endTime: string;
  position: Position;
  width: number;
}
