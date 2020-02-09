import WhiteboardCanvas from './WhiteboardCanvas';
import { TypeSocket } from 'typesocket';
import { WhiteboardMessage, WhiteboardMessageLineSegment, WhiteboardMessageInitialData } from './Types';

export default class WhiteboardWebSocket {
    private typeSocket: TypeSocket<WhiteboardMessage> = null;

    constructor(url: string,
        private whiteboardCanvas: WhiteboardCanvas,
        onConnected: () => void,
        onDisconnected: () => void) {

        this.typeSocket = new TypeSocket<WhiteboardMessage>(url);

        this.typeSocket.on('connected', onConnected);
        this.typeSocket.on('disconnected', onDisconnected);

        this.handleMessage = this.handleMessage.bind(this);
        this.typeSocket.on('message', this.handleMessage);
        this.typeSocket.connect();
    }

    handleMessage(obj: WhiteboardMessage) {
        switch (obj.type) {
            case 'lineSegment':
                const segmentMessage = obj as WhiteboardMessageLineSegment;
                this.whiteboardCanvas.lineSegment(segmentMessage.x1, segmentMessage.y1, segmentMessage.x2, segmentMessage.y2,
                    segmentMessage.color ? segmentMessage.color : 'red',
                    segmentMessage.width ? segmentMessage.width : 10);
                break;
            case 'initialData':
                const initialDataMessage = obj as WhiteboardMessageInitialData;
                this.whiteboardCanvas.initialize(initialDataMessage.dataURL, initialDataMessage.width, initialDataMessage.height);
                break;
            case 'clear':
                this.whiteboardCanvas.clear();
                break;
        }
    }

    clear() {
        const clearMessage: WhiteboardMessage = {
            type: 'clear',
        };

        this.typeSocket.send(clearMessage);
    }

    lineSegment(x1: number, y1: number, x2: number, y2: number, color = 'red', width = 10) {
        const segmentMessage: WhiteboardMessageLineSegment = {
            type: 'lineSegment',
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            color: color,
            width: width,
        };

        this.typeSocket.send(segmentMessage);
    }
}