import {initConfig} from '../config';

import {getRandomColor} from '@utils';

import {InitBoard, ITile} from '../type';

export const initBoard:InitBoard = (props) => {
    const {growNewTile} = props;
    const {rowCount, columnCount, tileSize} = initConfig;

    const board:Array<Array<ITile>> = [];

    // first making column arr
    // [[column], [column], ...]
    // column consists of rows indexes
    for (let column = 0; column < columnCount; column++) {
        board[column] = [];
        for (let row = 0; row < rowCount; row++) {
            const tileYCoordinate = row * tileSize;
            const tileXCoordinate = column * tileSize;
            const tileColor = getRandomColor();

            // drawing
            growNewTile({
                color: tileColor,
                constX: tileXCoordinate,
                constY: tileYCoordinate
            });

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