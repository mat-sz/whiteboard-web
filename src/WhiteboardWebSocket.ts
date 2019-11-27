import WhiteboardCanvas from './WhiteboardCanvas';
import { WhiteboardMessage, WhiteboardMessageLineSegment, WhiteboardMessageInitialData } from './Types';

export default class WhiteboardWebSocket {
    public webSocket: WebSocket = null;

    constructor(url: string,
        private whiteboardCanvas: WhiteboardCanvas) {

        this.webSocket = new WebSocket(url);

        this.webSocket.addEventListener('message', (e) => {
            try {
                const obj = JSON.parse(e.data) as WhiteboardMessage;
                
                switch (obj.type) {
                    case 'lineSegment':
                        const segmentMessage = obj as WhiteboardMessageLineSegment;
                        this.whiteboardCanvas.lineSegment(segmentMessage.x1, segmentMessage.y1, segmentMessage.x2, segmentMessage.y2);
                        break;
                    case 'initialData':
                        const initialDataMessage = obj as WhiteboardMessageInitialData;
                        this.whiteboardCanvas.initialize(initialDataMessage.dataURL, initialDataMessage.width, initialDataMessage.height);
                        break;
                    case 'clear':
                        this.whiteboardCanvas.clear();
                        break;
                }
            } catch (e) {
                // Ignore the message since it probably wasn't meant for us anyway.
            }
        });
    }

    lineSegment(x1: number, y1: number, x2: number, y2: number) {
        const segmentMessage: WhiteboardMessageLineSegment = {
            type: 'lineSegment',
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
        };

        this.webSocket.send(JSON.stringify(segmentMessage));
    }
}