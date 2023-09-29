import {addNewTiles, fallDownTiles, initBoard, removeTiles} from '@scene';
import {getTileRowColumnIndexesByXY} from '@utils';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
let board = initBoard({ctx});

const tilesHandler = (e:MouseEvent) => {
    canvas.removeEventListener('click', tilesHandler);

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const {column, row} = getTileRowColumnIndexesByXY(mouseX, mouseY);

    const boardWithoutSameColorAdjacentTiles = removeTiles({
        board,
        ctx,
        clickedTiles: {
            row: row,
            col: column
        }
    });

    if (boardWithoutSameColorAdjacentTiles) {
        setTimeout(() => {
            // board updating
            board = fallDownTiles({
                board: boardWithoutSameColorAdjacentTiles,
                ctx
            });

        }, 300);

        setTimeout(() => {
            // board updating
            board = addNewTiles({
                board,
                ctx
            });
        }, 600);
    }

    canvas.addEventListener('click', tilesHandler);
};

// tile clicking
canvas.addEventListener('click', tilesHandler);