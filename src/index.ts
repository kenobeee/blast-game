import {addNewTiles, tileFallingDown, initBoard, removeTiles} from '@scenes';
import {getTileRowColumnIndexesByXY, pause} from '@utils';
import {growNewTile, fallDownTiles} from '@drawing';
import {initConfig, gameConfig} from './config';
import {IDrawingAnimateService} from './type';

// DOM

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const scoreValue = document.getElementById('scoreValue') as HTMLSpanElement;
const stepsValue = document.getElementById('stepsValue') as HTMLSpanElement;
const scoreTarget = document.getElementById('scoreTarget') as HTMLSpanElement;

// init changing

stepsValue.textContent = `${gameConfig.totalAvailableSteps}`;
scoreTarget.textContent = `${gameConfig.scoreTarget}`;
canvas.height = initConfig.tileSize * initConfig.rowCount;
canvas.width = initConfig.tileSize * initConfig.columnCount;

// render foo

const updateScore = (value:number) => {
    score = value;
    scoreValue.textContent = `${value}`;
};

const decreaseSteps = () => {
    currentStepCount -= 1;
    stepsValue.textContent = `${currentStepCount}`;

    if (currentStepCount !== 0) {
        // continue
        if (score >= gameConfig.scoreTarget) alert('win');
    } else {
        alert('lose');
    }
};

const DrawingAnimateService:IDrawingAnimateService = {
    growNewTile: props => growNewTile({...props, ctx}),
    fallDownTiles: props => fallDownTiles({...props, ctx})
};

// vars

let board = initBoard({growNewTile: DrawingAnimateService.growNewTile});
let score = 0;
let currentStepCount = gameConfig.totalAvailableSteps;

const tilesHandler = async (e:MouseEvent) => {
    canvas.removeEventListener('click', tilesHandler);

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const {column, row} = getTileRowColumnIndexesByXY(mouseX, mouseY);

    const updated = removeTiles({
        board,
        growNewTile: DrawingAnimateService.growNewTile,
        clickedTiles: {
            row: row,
            col: column
        },
        currentScore: score
    });

    if (updated) {
        // todo сделать динамическим значение
        await pause(250);

        board = await tileFallingDown({
            board: updated.board,
            fallDownTiles: DrawingAnimateService.fallDownTiles
        });
       
        board = addNewTiles({
            board,
            growNewTile: DrawingAnimateService.growNewTile
        });

        // todo сделать динамическим значение
        await pause(250);

        updateScore(updated.score);
        decreaseSteps();

        canvas.addEventListener('click', tilesHandler);
    } else {
        canvas.addEventListener('click', tilesHandler);
    }
};

// tile clicking
canvas.addEventListener('click', tilesHandler);