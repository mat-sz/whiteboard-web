export default class WhiteboardCanvas {
    private ctx: CanvasRenderingContext2D = null;

    constructor(public canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.clear();
    }

    lineSegment(x1: number, y1: number, x2: number, y2: number) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    clear() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.strokeStyle = 'red';
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = 10;
    }

    initialize(dataURL: string, width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.clear();
        
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };
        image.src = dataURL;
    }
}