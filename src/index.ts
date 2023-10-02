import {addNewTiles, tileFallingDown, initBoard, removeTiles} from '@scenes';
import {getTileRowColumnIndexesByXY, pause} from '@utils';
import {growNewTile, fallDownTiles} from '@drawing';
import {initConfig} from './config';
import {IDrawingAnimateService} from './type';

// DOM

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const scoreValue = document.getElementById('scoreValue') as HTMLSpanElement;

// dynamic sizing
canvas.height = initConfig.tileSize * initConfig.rowCount;
canvas.width = initConfig.tileSize * initConfig.columnCount;

// render foo

const updateScore = (value:number) => {
    scoreValue.textContent = `${value}`;
};

// todo rename
const DrawingAnimateService:IDrawingAnimateService = {
    growNewTile: props => growNewTile({...props, ctx}),
    fallDownTiles: props => fallDownTiles({...props, ctx})
};

// vars

let board = initBoard({growNewTile: DrawingAnimateService.growNewTile});
let score = 0;

const tilesHandler = async (e:MouseEvent) => {
    canvas.removeEventListener('click', tilesHandler);

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const {column, row} = getTileRowColumnIndexesByXY(mouseX, mouseY);

    const boardWithoutSameColorAdjacentTiles = removeTiles({
        board,
        growNewTile: DrawingAnimateService.growNewTile,
        clickedTiles: {
            row: row,
            col: column
        }
    });

    if (boardWithoutSameColorAdjacentTiles) {
        await pause(200);

        updateScore(++score);

        board = await tileFallingDown({
            board: boardWithoutSameColorAdjacentTiles,
            fallDownTiles: DrawingAnimateService.fallDownTiles
        });
       
        board = addNewTiles({
            board,
            growNewTile: DrawingAnimateService.growNewTile
        });

        canvas.addEventListener('click', tilesHandler);

    } else {
        canvas.addEventListener('click', tilesHandler);
    }
};

// tile clicking
canvas.addEventListener('click', tilesHandler);