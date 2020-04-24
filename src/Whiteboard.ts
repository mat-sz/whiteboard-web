import WhiteboardCanvas from './WhiteboardCanvas';
import WhiteboardInput from './WhiteboardInput';
import WhiteboardWebSocket from './WhiteboardWebSocket';

class Whiteboard {
  private whiteboardCanvas: WhiteboardCanvas = null;
  private whiteboardWebSocket: WhiteboardWebSocket = null;
  private whiteboardInput: WhiteboardInput = null;

  constructor(
    canvas: HTMLCanvasElement,
    url: string,
    onConnected: () => void,
    onDisconnected: () => void
  ) {
    this.whiteboardCanvas = new WhiteboardCanvas(canvas);
    this.whiteboardWebSocket = new WhiteboardWebSocket(
      url,
      this.whiteboardCanvas,
      onConnected,
      onDisconnected
    );
    this.whiteboardInput = new WhiteboardInput(
      this.whiteboardCanvas,
      this.whiteboardWebSocket
    );
  }

  clear() {
    this.whiteboardWebSocket.clear();
    this.whiteboardCanvas.clear();
  }

  setColor(color: string) {
    this.whiteboardInput.color = color;
  }

  setWidth(width: number) {
    this.whiteboardInput.width = width;
  }
}

export default Whiteboard;
