import {addNewTiles, tileFallingDown, initBoard, removeTiles} from '@scenes';
import {getTileRowColumnIndexesByXY} from '@utils';
import {growNewTile, fallDownTiles} from '@drawing';

import {IGrowingAnimateService} from './type';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const GrowingAnimateService:IGrowingAnimateService = {
    growNewTile: props => growNewTile({...props, ctx}),
    fallDownTiles: props => fallDownTiles({...props, ctx})
};

let board = initBoard({growNewTile: GrowingAnimateService.growNewTile});

const tilesHandler = (e:MouseEvent) => {
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
        setTimeout(() => {
            // board updating
            board = tileFallingDown({
                board: boardWithoutSameColorAdjacentTiles,
                fallDownTiles: GrowingAnimateService.fallDownTiles
            });
        }, 200);

        setTimeout(() => {
            // board updating
            board = addNewTiles({
                board,
                growNewTile: GrowingAnimateService.growNewTile
            });

            canvas.addEventListener('click', tilesHandler);
        }, 500);
    } else {
        canvas.addEventListener('click', tilesHandler);
    }
};

// tile clicking
canvas.addEventListener('click', tilesHandler);