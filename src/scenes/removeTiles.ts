import {initConfig} from '../config';

import {getTileRowColumnIndexesByXY} from '@utils';

import {ITile, RemoveTiles} from '../type';

export const removeTiles:RemoveTiles = (props) => {
    const {board, clickedTiles, growNewTile, currentScore} = props;
    const {row, col} = clickedTiles;
    const {emptyTileBackground, totalRowsQty, totalColumnQty} = initConfig;

    const chosenGroup = board[col][row]?.group;
    const tilesForRemove:any = [];
    let updatedScore:number = currentScore;

    const findAllSameColorAdjacentTiles = (currentColumn:number, currentRow:number) => {
        const currentTile = board[currentColumn][currentRow];

        const isDesiredGroup = currentTile?.group === chosenGroup;
        const isNewTile = !tilesForRemove.some((tile:ITile) => tile === currentTile);

        if (isDesiredGroup && isNewTile) {
            tilesForRemove.push(currentTile);

            const neighbors = [
                {row: currentRow - 1, col: currentColumn},
                {row: currentRow + 1, col: currentColumn},
                {row: currentRow, col: currentColumn - 1},
                {row: currentRow, col: currentColumn + 1},
            ];

            neighbors.forEach(neighbor => {
                const {row: nextRow, col: nextColumn} = neighbor;
                const isWithinBounds = nextRow >= 0 && nextRow < totalRowsQty && nextColumn >= 0 && nextColumn < totalColumnQty;

                if (isWithinBounds) findAllSameColorAdjacentTiles(nextColumn, nextRow);
            });
        }

        return;
    };

    findAllSameColorAdjacentTiles(col, row);

    if (tilesForRemove.length > 1) {
        tilesForRemove.forEach((tile:ITile) => {
            const {column, row} = getTileRowColumnIndexesByXY(tile.x, tile.y);

            // @ts-ignore
            updatedScore += board[column][row]?.score;
            // caching
            board[column][row] = null;

            const image = new Image();

            image.src = emptyTileBackground;
            image.onload = () => {
                // drawing
                growNewTile({
                    constX: tile.x,
                    constY: tile.y,
                    bg: image
                });
            };
        });
        
        return {board, score: updatedScore};
    } else {
        return null;
    }
};