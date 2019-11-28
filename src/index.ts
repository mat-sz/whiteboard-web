import './App.scss';
import Whiteboard from './Whiteboard';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const loadingDiv = document.getElementById('loading');

let whiteboard = new Whiteboard(canvas, 'ws://localhost:5000/ws', () => {
    loadingDiv.style.display = 'none';
});

const clearButton = document.getElementById('button-clear');
clearButton.addEventListener('click', () => {
    whiteboard.clear();
});

const colorButtons = document.getElementsByClassName('button-color');
for (let index in colorButtons) {
    const button = colorButtons[index];
    button.addEventListener('click', () => {
        whiteboard.setColor(button.getAttribute('data-color'));
    });
}