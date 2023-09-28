import {config} from '../config';

import {getRandomColor} from '@utils';

import {CreateBoard, ITile} from '../type';

export const createBoard:CreateBoard = () => {
    const {rowsCount, columnCount, tileSize} = config;

    const board:Array<Array<ITile>> = [];

    for (let row = 0; row < rowsCount; row++) {
        board[row] = [];
        for (let col = 0; col < columnCount; col++) {
            board[row][col] = {
                x: col * tileSize,
                y: row * tileSize,
                color: getRandomColor()
            };
        }
    }

    return board;
};