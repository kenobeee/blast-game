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
const finishGameModal = document.getElementById('finishGameModal') as HTMLDivElement;
const finishGameModalTitle = document.getElementById('finishGameModalTitle') as HTMLElement;
const finishGameModalRepeatBtn = document.getElementById('finishGameModalRepeatBtn') as HTMLButtonElement;

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

const updateScoreField = (score:number, steps:number) => {
    scoreValue.textContent = `${score}`;
    stepsValue.textContent = `${steps}`;
};
const step = (newScoreQty:number) => {
    score = newScoreQty;
    stepsLeft -= 1;

    updateScoreField(newScoreQty, stepsLeft);

    const isBoardHasCluster = checkClusterAvailability(board);
    const isHasSteps = stepsLeft > 0;
    const isTilesShufflingAlreadyUsed = shuffleTilesButton.disabled;
    const isTilesTeleportingAlreadyUsed = shuffleTilesButton.disabled;

    if (newScoreQty >= gameConfig.scoreTarget) {
        finishGame('win');
        
        return;
    }
    else if ((!isBoardHasCluster && isTilesShufflingAlreadyUsed && isTilesTeleportingAlreadyUsed) || !isHasSteps) {
        finishGame('lose');
        
        return;
    }

    enableCanvas();
};
const finishGame = async (result:'win' | 'lose') => {
    disableCanvas();
    await pause(100);

    // inserted text
    finishGameModalTitle.textContent = result === 'win' ? 'You won!' : 'You lose.';
    // open modal
    finishGameModal.classList.add('modal--opened');
};
const restartGame = async () => {
    // close modal
    finishGameModal.classList.remove('modal--opened');

    await pause(100);

    score = 0;
    stepsLeft = gameConfig.totalAvailableSteps;
    board = initBoard({growNewTile: DrawingAnimateService.growNewTile});
    shuffleTilesButton.disabled = false;
    teleportTilesButton.disabled = false;

    updateScoreField(score, stepsLeft);
    enableCanvas();
};
const disableCanvas = () => canvas.removeEventListener('click', canvasHandler);
const enableCanvas = () => canvas.addEventListener('click', canvasHandler);
const DrawingAnimateService:IDrawingAnimateService = {
    growNewTile: props => growNewTile({...props, ctx}),
    fallDownTiles: props => fallDownTiles({...props, ctx})
};

// vars

let score = 0;
let stepsLeft = gameConfig.totalAvailableSteps;
let board = initBoard({growNewTile: DrawingAnimateService.growNewTile});

// handlers

const canvasHandler = async (e:MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const {column, row} = getTileRowColumnIndexesByXY(mouseX, mouseY);

    disableCanvas();

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

        step(updated.score);

        return;
    }

    enableCanvas();
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
        await pause(25);

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
        await pause(25);
        leftShuffles--;
        await shuffle2DArray(leftShuffles);
    };

    await shuffle2DArray(gameConfig.shufflingQty);

    // separating
    const twoDimensionalArray = [];
    const chunkSize = initConfig.totalRowsQty;

    for (let i = 0; i < flattenedBoard.length; i += chunkSize) {
        const chunk = flattenedBoard.slice(i, i + chunkSize);
        
        twoDimensionalArray.push(chunk);
    }

    board = twoDimensionalArray;

    checkClusterAvailability(board) ? enableCanvas() : finishGame('lose');
};
const teleportTilesHandler = () => {
    teleportTilesButton.disabled = true;
    disableCanvas();

    let cache:{column:number, row:number} | undefined = undefined;

    const getCoords = async (e:MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const {column, row} = getTileRowColumnIndexesByXY(mouseX, mouseY);

        if (cache) {
            const column2 = cache.column;
            const row2 = cache.row;

            const tile1 = board[column][row] as ITile;
            const tile2 = board[column2][row2] as  ITile;

            const image = new Image();

            image.src = initConfig.emptyTileBackground;

            // drawing
            DrawingAnimateService.growNewTile({
                constX: tile1.x,
                constY: tile1.y,
                bg: image
            });
            DrawingAnimateService.growNewTile({
                constX: tile2.x,
                constY: tile2.y,
                bg: image
            });

            // todo динамически
            await pause(250);

            board[column][row] = {...tile2, y: tile1.y, x: tile1.x};
            board[column2][row2] = {...tile1, y: tile2.y, x: tile2.x};

            const image1 = new Image();
            const image2 = new Image();

            image1.src = tile2.bg;
            image2.src = tile1.bg;

            // drawing
            DrawingAnimateService.growNewTile({
                constX: tile1.x,
                constY: tile1.y,
                bg: image1
            });
            DrawingAnimateService.growNewTile({
                constX: tile2.x,
                constY: tile2.y,
                bg: image2
            });

            // todo динамически
            await pause(250);

            canvas.removeEventListener('click', getCoords);
            enableCanvas();
        } else {
            cache = {column, row};
        }
    };

    canvas.addEventListener('click', getCoords);
};

// event listening

enableCanvas();
shuffleTilesButton.addEventListener('click', shuffleTilesHandler);
teleportTilesButton.addEventListener('click', teleportTilesHandler);
finishGameModalRepeatBtn.addEventListener('click', restartGame);