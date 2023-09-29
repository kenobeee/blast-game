import {config} from '../config';

import {getTileRowColumnIndexesByXY} from '@utils';

import {ITile, RemoveTiles} from '../type';

export const removeTiles:RemoveTiles = (props) => {
    const {board, ctx, clickedTiles} = props;
    const {row, col} = clickedTiles;
    const {tileSize} = config;

    const chosenColor = board[col][row]?.color;
    const tilesForRemove:any = [];

    const findAllSameColorAdjacentTiles = (currentRow:number, currentColumn:number) => {
        const currentTile = board[currentColumn][currentRow];

        const isDesiredColor = currentTile?.color === chosenColor;
        const isNewTile = !tilesForRemove.some((tile:ITile) => tile === currentTile);

        if (isDesiredColor && isNewTile) {
            tilesForRemove.push(currentTile);

            const numRows = board.length;
            const numCols = board[0].length;

            const neighbors = [
                {row: currentRow - 1, col: currentColumn},
                {row: currentRow + 1, col: currentColumn},
                {row: currentRow, col: currentColumn - 1},
                {row: currentRow, col: currentColumn + 1},
            ];

            neighbors.forEach(neighbor => {
                const {row: nextRow, col: nextColumn} = neighbor;
                const isWithinBounds = nextRow >= 0 && nextRow < numRows && nextColumn >= 0 && nextColumn < numCols;

                if (isWithinBounds) {
                    findAllSameColorAdjacentTiles(nextRow, nextColumn);
                }
            });
        }

        return;
    };

    findAllSameColorAdjacentTiles(row, col);

    if (tilesForRemove.length > 1) {
        // deleting...
        tilesForRemove.forEach((tile:ITile) => {
            const {column, row} = getTileRowColumnIndexesByXY(tile.x, tile.y);

            // caching
            board[column][row] = null;

            // drawing
            ctx.fillStyle = 'white';
            ctx.fillRect(tile.x, tile.y, tileSize, tileSize);
        });

        return board;
    } else {
        return null;
    }
};