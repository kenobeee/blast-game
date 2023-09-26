import {DrawBoard} from '../type';

import {config} from '../config';

export const drawBoard:DrawBoard = (props) => {
    const {board, ctx} = props;
    const {numRows, numCols, tileSize} = config;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const tile = board[row][col];

            if (tile) {
                ctx.fillStyle = tile.color;
                ctx.fillRect(tile.x, tile.y, tileSize, tileSize);
            }
        }
    }
};