import {config} from '../config';

import {ITile, RemoveTiles} from '../type';
import {getTileRowColumnIndexesByXY} from '@utils';

export const removeTiles:RemoveTiles = (props) => {
    const {board, clickedTiles} = props;
    const {row, col} = clickedTiles;
    const {columnCount, rowsCount} = config;

    const chosenColor = board[col][row]?.color;
    const tilesForRemove:any = [];

    const findAllSameColorAdjacentTiles = (currentRow:number, currentColumn:number) => {
        const currentTile = board[currentColumn][currentRow];

        const isDesiredColor = currentTile?.color === chosenColor;
        const isNewTile = !tilesForRemove.includes(currentTile);

        // moving
        if (isDesiredColor && isNewTile) {
            tilesForRemove.push(currentTile);

            const nextRow = currentRow + 1;
            const prevRow = currentRow - 1;
            const nextColumn = currentColumn + 1;
            const prevColumn = currentColumn - 1;

            const isAvailableMoveOnX = prevRow >= 0 && nextRow < rowsCount;
            const isAvailableMoveOnY = prevColumn >= 0 && nextColumn < columnCount;

            if (isAvailableMoveOnX) {
                findAllSameColorAdjacentTiles(prevRow, currentColumn);
                findAllSameColorAdjacentTiles(nextRow, currentColumn);
            }

            if (isAvailableMoveOnY) {
                findAllSameColorAdjacentTiles(currentRow, prevColumn);
                findAllSameColorAdjacentTiles(currentRow, nextColumn);
            }
        }

        return;
    };

    findAllSameColorAdjacentTiles(row, col);

    // deleting...
    tilesForRemove.length > 1 && tilesForRemove.forEach((tile:ITile) => {
        const {column, row} = getTileRowColumnIndexesByXY(tile.x, tile.y);

        board[column][row] = null; // Удаление тайла
    });

    return board;
};