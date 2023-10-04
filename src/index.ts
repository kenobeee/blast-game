import {addNewTiles, tileFallingDown, initBoard, removeTiles} from '@scenes';
import {checkClusterAvailability, getRandomInt, getTileRowColumnIndexesByXY, pause} from '@utils';
import {growNewTile, fallDownTiles} from '@drawing';
import {initConfig, gameConfig} from './config';
import {IDrawingAnimateService, ITile} from './type';

// DOM elements

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const scoreValue = document.getElementById('scoreValue') as HTMLSpanElement;
const stepsValue = document.getElementById('stepsValue') as HTMLSpanElement;
const scoreTarget = document.getElementById('scoreTarget') as HTMLSpanElement;
const tilesInfoContainer = document.getElementById('tilesInfoContainer') as HTMLElement;
const shuffleTilesButton = document.getElementById('shuffleTiles') as HTMLButtonElement;
const teleportTilesButton = document.getElementById('teleportTiles') as HTMLButtonElement;

// init render

stepsValue.textContent = `${gameConfig.totalAvailableSteps}`;
scoreTarget.textContent = `${gameConfig.scoreTarget}`;
canvas.height = initConfig.tileSize * initConfig.totalRowsQty;
canvas.width = initConfig.tileSize * initConfig.totalColumnQty;

const createThenAppend = (props:Pick<ITile, 'view' | 'score'>) => {
    const {view, score} = props;
    const wrapper = document.createElement('div');
    const img = document.createElement('span');
    const text = document.createElement('span');

    wrapper.className = 'sidebar__pair';
    img.className = 'sidebar__img';
    text.className = 'sidebar__text';

    text.textContent = `${score}`;
    img.style.backgroundImage = `url(${view})`;

    wrapper.appendChild(img);
    wrapper.appendChild(text);

    tilesInfoContainer.appendChild(wrapper);
};

initConfig.tilesInfo.forEach(tile => createThenAppend(tile));

// render foo

const updateState = (newScoreQty:number) => {
    score = newScoreQty;
    stepsLeft -= 1;

    scoreValue.textContent = `${newScoreQty}`;
    stepsValue.textContent = `${stepsLeft}`;

    const isBoardHasCluster = checkClusterAvailability(board);
    const isHasStillSteps = stepsLeft !== 0;
    const isScoreNotYetFulled = newScoreQty < gameConfig.scoreTarget;
    const isTilesShufflingNotYetUsed = shuffleTilesButton.disabled;

    if (isHasStillSteps && isBoardHasCluster && (isScoreNotYetFulled || isTilesShufflingNotYetUsed)) enableCanvas();
    else disableCanvas();
};
const disableCanvas = () => canvas.removeEventListener('click', tilesHandler);
const enableCanvas = () => canvas.addEventListener('click', tilesHandler);

const DrawingAnimateService:IDrawingAnimateService = {
    growNewTile: props => growNewTile({...props, ctx}),
    fallDownTiles: props => fallDownTiles({...props, ctx})
};

// vars

let board = initBoard({growNewTile: DrawingAnimateService.growNewTile});
let score = 0;
let stepsLeft = gameConfig.totalAvailableSteps;

// handlers

const tilesHandler = async (e:MouseEvent) => {
    disableCanvas();

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

        updateState(updated.score);
    } else {
        enableCanvas();
    }
};
const shuffleTilesHandler = async () => {
    disableCanvas();
    shuffleTilesButton.disabled = true;

    const flattenedBoard = board.flat() as Array<ITile>;

    const shuffle2DArray = async (leftShuffles:number)=> {
        if (leftShuffles === 0) return;

        const firstIndex = getRandomInt(0, flattenedBoard.length - 1);
        const secondIndex = getRandomInt(0, flattenedBoard.length - 1);

        const x1 = flattenedBoard[firstIndex].x;
        const y1 = flattenedBoard[firstIndex].y;
        const x2 = flattenedBoard[secondIndex].x;
        const y2 = flattenedBoard[secondIndex].y;

        const image = new Image();

        image.src = initConfig.emptyTileBackground;

        // drawing
        DrawingAnimateService.growNewTile({
            constX: flattenedBoard[firstIndex].x,
            constY: flattenedBoard[firstIndex].y,
            bg: image
        });
        DrawingAnimateService.growNewTile({
            constX: flattenedBoard[secondIndex].x,
            constY: flattenedBoard[secondIndex].y,
            bg: image
        });

        // todo динамически
        await pause(250);

        [flattenedBoard[firstIndex], flattenedBoard[secondIndex]] = [flattenedBoard[secondIndex], flattenedBoard[firstIndex]];

        flattenedBoard[firstIndex].x = x1;
        flattenedBoard[firstIndex].y = y1;
        flattenedBoard[secondIndex].x = x2;
        flattenedBoard[secondIndex].y= y2;

        const image1 = new Image();
        const image2 = new Image();

        image1.src = flattenedBoard[firstIndex].bg;
        image2.src = flattenedBoard[secondIndex].bg;

        // drawing
        DrawingAnimateService.growNewTile({
            constX: flattenedBoard[firstIndex].x,
            constY: flattenedBoard[firstIndex].y,
            bg: image1
        });
        DrawingAnimateService.growNewTile({
            constX: flattenedBoard[secondIndex].x,
            constY: flattenedBoard[secondIndex].y,
            bg: image2
        });

        // todo динамически
        await pause(250);
        leftShuffles--;
        await shuffle2DArray(leftShuffles);
    };

    await shuffle2DArray(10);

    // separating
    const twoDimensionalArray = [];
    const chunkSize = initConfig.totalColumnQty;

    for (let i = 0; i < flattenedBoard.length; i += chunkSize) {
        const chunk = flattenedBoard.slice(i, i + chunkSize);
        
        twoDimensionalArray.push(chunk);
    }

    board = twoDimensionalArray;

    enableCanvas();
};
const teleportTilesHandler = () => {
    disableCanvas();

    enableCanvas();
};

// event listening

enableCanvas();
shuffleTilesButton.addEventListener('click', shuffleTilesHandler);
teleportTilesButton.addEventListener('click', teleportTilesHandler);