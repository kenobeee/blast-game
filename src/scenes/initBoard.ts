import {initConfig} from '../config';

import {generateTileByRowAndColumn} from '@utils';

import {InitBoard, ITile} from '../type';

export const initBoard:InitBoard = (props) => {
    const {growNewTile} = props;
    const {totalRowsQty, totalColumnQty} = initConfig;

    const board:Array<Array<ITile>> = [];

    // first making column arr
    // [[column], [column], ...]
    // column consists of rows indexes
    for (let column = 0; column < totalColumnQty; column++) {
        board[column] = [];
        for (let row = 0; row < totalRowsQty; row++) {
            const newTile = generateTileByRowAndColumn({row, column});
            const image = new Image();

            image.src = newTile.bg;
            image.onload = () => {
                // drawing
                growNewTile({
                    bg: image,
                    constX: newTile.x,
                    constY: newTile.y
                });
            };

            // caching
            board[column][row] = newTile;
        }
    }

    return board;
};