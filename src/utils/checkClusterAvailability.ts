import {initConfig} from '../config';

import {CheckClusterAvailability, ITile} from '../type';

export const checkClusterAvailability:CheckClusterAvailability = (board) => {
    const {totalColumnQty, totalRowsQty} = initConfig;

    for (let column = 0; column < totalColumnQty; column++) {
        for (let row = 0; row < totalRowsQty; row++) {
            const currentTile = board[column][row] as ITile;

            if (column + 1 < totalColumnQty) {
                const rightTile = board[column + 1][row] as ITile;

                if (currentTile.group === rightTile.group) return true;
            }

            if (row + 1 < totalRowsQty) {
                const downTile = board[column][row + 1] as ITile;

                if (currentTile.group === downTile.group) return true;
            }
        }
    }

    return false;
};