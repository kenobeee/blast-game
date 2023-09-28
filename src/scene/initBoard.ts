import {config} from '../config';

import {getRandomColor} from '@utils';

import {CreateBoard, ITile} from '../type';

export const initBoard:CreateBoard = (props) => {
    const {ctx} = props;
    const {rowsCount, columnCount, tileSize} = config;

    const board:Array<Array<ITile>> = [];

    // first making column arr
    // [[column], [column], ...]
    // column consists of rows indexes
    for (let column = 0; column < columnCount; column++) {
        board[column] = [];
        for (let row = 0; row < rowsCount; row++) {
            const tileYCoordinate = row * tileSize;
            const tileXCoordinate = column * tileSize;
            const tileColor = getRandomColor();

            // drawing
            ctx.fillStyle = tileColor;
            ctx.fillRect(tileXCoordinate, tileYCoordinate, tileSize, tileSize);

            // caching
            board[column][row] = {
                x: tileXCoordinate,
                y: tileYCoordinate,
                color: tileColor
            };
        }
    }

    return board;
};