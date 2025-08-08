export interface WorkCardType {
  id: number;
  cropName: string;
  workName: string;
  workTime: string;
  isCompleted: boolean;
}

export interface WorkBlockType {
  id: number;
  cropName: string;
  workName: string;
  workTime: string;
  startTime: string;
  endTime: string;
  position: { x: number; y: number };
  width: number;
}
