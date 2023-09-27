import {config} from '../config';

import {ITile, RemoveTiles} from '../type';

export const removeTiles:RemoveTiles = (props) => {
    const {board, row, col} = props;
    const {tileSize, numCols, numRows} = config;

    const color = board[row][col]?.color;
    const tilesToRemove:any = []; // Массив для хранения координат удаляемых тайлов

    const floodFill = (r:number, c:number) => {
        if (r < 0 || r >= numRows || c < 0 || c >= numCols || board[r][c]?.color !== color || tilesToRemove.includes(board[r][c])) {
            return;
        }

        tilesToRemove.push(board[r][c]);

        floodFill(r - 1, c); // up
        floodFill(r + 1, c); // down
        floodFill(r, c - 1); // left
        floodFill(r, c + 1); // right
    };

    floodFill(row, col);

    tilesToRemove.length > 1 && tilesToRemove.forEach((tile:ITile) => {
        const r = Math.floor(tile.y / tileSize);
        const c = Math.floor(tile.x / tileSize);

        board[r][c] = {...board[r][c], color: 'white'}; // Удаление тайла
    });

    return board;
};