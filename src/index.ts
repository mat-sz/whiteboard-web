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