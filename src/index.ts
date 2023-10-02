import {addNewTiles, tileFallingDown, initBoard, removeTiles} from '@scenes';
import {getTileRowColumnIndexesByXY, pause} from '@utils';
import {growNewTile, fallDownTiles} from '@drawing';
import {initConfig} from './config';
import {IGrowingAnimateService} from './type';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

// dynamic sizing
canvas.height = initConfig.tileSize * initConfig.rowCount;
canvas.width = initConfig.tileSize * initConfig.columnCount;

const GrowingAnimateService:IGrowingAnimateService = {
    growNewTile: props => growNewTile({...props, ctx}),
    fallDownTiles: props => fallDownTiles({...props, ctx})
};

let board = initBoard({growNewTile: GrowingAnimateService.growNewTile});

const tilesHandler = async (e:MouseEvent) => {
    canvas.removeEventListener('click', tilesHandler);

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const {column, row} = getTileRowColumnIndexesByXY(mouseX, mouseY);

    const boardWithoutSameColorAdjacentTiles = removeTiles({
        board,
        growNewTile: GrowingAnimateService.growNewTile,
        clickedTiles: {
            row: row,
            col: column
        }
    });

    if (boardWithoutSameColorAdjacentTiles) {
        await pause(200);

        board = await tileFallingDown({
            board: boardWithoutSameColorAdjacentTiles,
            fallDownTiles: GrowingAnimateService.fallDownTiles
        });
       
        board = addNewTiles({
            board,
            growNewTile: GrowingAnimateService.growNewTile
        });

        canvas.addEventListener('click', tilesHandler);

    } else {
        canvas.addEventListener('click', tilesHandler);
    }
};

// tile clicking
canvas.addEventListener('click', tilesHandler);