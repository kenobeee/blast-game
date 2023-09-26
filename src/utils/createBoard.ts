import {CreateBoard, ITile} from '../type';

import {config} from '../config';

export const createBoard:CreateBoard = () => {
    const {numRows, numCols, tileSize, colors} = config;

    const board:Array<Array<ITile>> = [];

    for (let row = 0; row < numRows; row++) {
        board[row] = [];
        for (let col = 0; col < numCols; col++) {
            board[row][col] = {
                x: col * tileSize,
                y: row * tileSize,
                color: colors[Math.floor(Math.random() * colors.length)]
            };
        }
    }

    return board;
};