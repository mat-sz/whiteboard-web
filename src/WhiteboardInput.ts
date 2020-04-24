import WhiteboardCanvas from './WhiteboardCanvas';
import WhiteboardWebSocket from './WhiteboardWebSocket';

export default class WhiteboardInput {
  private drawing = false;
  private x = 0;
  private y = 0;

  public color = 'red';
  public width = 10;

  mouseDown = (e: MouseEvent) => {
    this.beginDrawing(e.offsetX, e.offsetY);
  };

  mouseMove = (e: MouseEvent) => {
    if (!this.drawing) return;
    this.draw(e.offsetX, e.offsetY);
  };

  mouseUp = (e: MouseEvent) => {
    this.endDrawing(e.offsetX, e.offsetY);
  };

  touchStart = (e: TouchEvent) => {
    const offset = this.getTouchOffset(e);
    this.beginDrawing(offset.x, offset.y);
  };

  touchMove = (e: TouchEvent) => {
    const offset = this.getTouchOffset(e);
    this.draw(offset.x, offset.y);
  };

  touchEnd = (e: TouchEvent) => {
    const offset = this.getTouchOffset(e);
    this.endDrawing(offset.x, offset.y);
  };

  constructor(
    private whiteboardCanvas: WhiteboardCanvas,
    private whiteboardWebSocket: WhiteboardWebSocket
  ) {
    const canvas = whiteboardCanvas.canvas;
    canvas.addEventListener('mousedown', this.mouseDown);
    canvas.addEventListener('mousemove', this.mouseMove);
    canvas.addEventListener('mouseup', this.mouseUp);
    canvas.addEventListener('mouseleave', this.mouseUp);

    canvas.addEventListener('touchstart', this.touchStart);
    canvas.addEventListener('touchmove', this.touchMove);
    canvas.addEventListener('touchend', this.touchEnd);
    canvas.addEventListener('touchcancel', this.touchEnd);
  }

  getTouchOffset(e: TouchEvent) {
    const rectangle = (e.target as HTMLElement).getBoundingClientRect();
    const touch = e.touches[0];
    return {
      x: ((touch.pageX - rectangle.left) * 800) / rectangle.width,
      y: ((touch.pageY - rectangle.top) * 800) / rectangle.height,
    };
  }

  beginDrawing(x: number, y: number) {
    this.drawing = true;
    this.x = x;
    this.y = y;
  }

  draw(x: number, y: number) {
    if (!this.drawing) return;
    this.whiteboardCanvas.lineSegment(
      this.x,
      this.y,
      x,
      y,
      this.color,
      this.width
    );
    this.whiteboardWebSocket.lineSegment(
      this.x,
      this.y,
      x,
      y,
      this.color,
      this.width
    );
    this.x = x;
    this.y = y;
  }

  endDrawing(x: number, y: number) {
    if (!this.drawing) return;
    this.drawing = false;
    this.whiteboardCanvas.lineSegment(
      this.x,
      this.y,
      x,
      y,
      this.color,
      this.width
    );
    this.whiteboardWebSocket.lineSegment(
      this.x,
      this.y,
      x,
      y,
      this.color,
      this.width
    );
  }
}
