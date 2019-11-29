import './App.scss';
import Whiteboard from './Whiteboard';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const statusBar = document.getElementById('status');

let whiteboard = new Whiteboard(canvas, 'ws://' + location.hostname + ':5000/ws',
    () => {
        statusBar.style.display = 'none';
    }, 
    () => {
        statusBar.style.display = 'block';
    }
);

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
    whiteboard.clear();
});

const colorButtons = document.getElementsByClassName('controls__color');
for (let index in colorButtons) {
    const button = colorButtons[index];
    button.addEventListener('click', () => {
        whiteboard.setColor(button.getAttribute('data-color'));
    });
}