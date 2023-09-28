import {config} from './config';

import {initBoard, removeTiles} from '@scene';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const board = initBoard({ctx});
const {tileSize} = config;

// tile clicking
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const clickedRow = Math.floor(mouseY / tileSize);
    const clickedCol = Math.floor(mouseX / tileSize);

    const newBoard = removeTiles({
        board,
        clickedTiles: {
            row: clickedRow,
            col: clickedCol
        }
    });

    console.log(newBoard);
});