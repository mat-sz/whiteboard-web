import './App.scss';
import WhiteboardCanvas from './WhiteboardCanvas';
import WhiteboardInput from './WhiteboardInput';
import WhiteboardWebSocket from './WhiteboardWebSocket';

class Whiteboard {
    private whiteboardCanvas: WhiteboardCanvas = null;
    private whiteboardWebSocket: WhiteboardWebSocket = null;
    private whiteboardInput: WhiteboardInput = null;

    private loadingDiv: HTMLElement = null;

    constructor(canvasId: string, loadingId: string, url: string) {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement;

        this.loadingDiv = document.getElementById(loadingId);

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
        this.loadingDiv.style.display = 'none';
    }
}

new Whiteboard('canvas', 'loading', 'ws://localhost:5000/ws');