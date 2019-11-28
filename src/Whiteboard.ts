import WhiteboardCanvas from './WhiteboardCanvas';
import WhiteboardInput from './WhiteboardInput';
import WhiteboardWebSocket from './WhiteboardWebSocket';

class Whiteboard {
    private whiteboardCanvas: WhiteboardCanvas = null;
    private whiteboardWebSocket: WhiteboardWebSocket = null;
    private whiteboardInput: WhiteboardInput = null;

    constructor(canvas: HTMLCanvasElement, url: string,
        private onReady: () => void) {

        this.whiteboardCanvas = new WhiteboardCanvas(canvas);
        this.whiteboardWebSocket = new WhiteboardWebSocket(url, this.whiteboardCanvas);
        this.whiteboardInput = new WhiteboardInput(this.whiteboardCanvas, this.whiteboardWebSocket);

        this.whiteboardWebSocket.webSocket.addEventListener("open", () => {
            this.connected();
        });

        this.whiteboardWebSocket.webSocket.addEventListener("error", () => {
            //this.error();
        });

        this.whiteboardWebSocket.webSocket.addEventListener("close", () => {
            //this.disconnected();
        });

        if (this.whiteboardWebSocket.webSocket.readyState == WebSocket.OPEN) {
            this.connected();
        }
    }

    connected() {
        this.onReady();
    }

    clear() {
        this.whiteboardWebSocket.clear();
        this.whiteboardCanvas.clear();
    }
}

export default Whiteboard;