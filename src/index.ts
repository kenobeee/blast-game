import {initBoard, removeTiles} from '@scene';
import {getTileRowColumnIndexesByXY} from '@utils';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const board = initBoard({ctx});

// tile clicking
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const {column, row} = getTileRowColumnIndexesByXY(mouseX, mouseY);

    const newBoard = removeTiles({
        board,
        clickedTiles: {
            row: row,
            col: column
        }
    });

    console.log(newBoard);
});