import {config} from './config';

import {createBoard, drawBoard} from '@utils';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const board = createBoard();

const {tileSize} = config;

// tile clicking
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const clickedRow = Math.floor(mouseY / tileSize);
    const clickedCol = Math.floor(mouseX / tileSize);

    console.log(clickedCol, clickedRow);
});

drawBoard({board, ctx});