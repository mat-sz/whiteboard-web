export interface WhiteboardMessage {
  type: string;
}

export interface WhiteboardMessageInitialData extends WhiteboardMessage {
  type: 'initialData';
  dataURL: string;
  width: 800;
  height: 800;
}

export interface WhiteboardMessageLineSegment extends WhiteboardMessage {
  type: 'lineSegment';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
}
