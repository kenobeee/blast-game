import {CheckClusterAvailability, ITile} from '../type';
import {initConfig} from '../config';

export const checkClusterAvailability:CheckClusterAvailability = (board) => {
    for (let column = 0; column < initConfig.columnCount - 1; column++) {
        for (let row = 0; row < initConfig.rowCount - 1; row++) {
            const currentTile = board[column][row] as ITile;
            const rightTile = board[column + 1][row] as ITile;
            const downTile = board[column][row + 1] as ITile;

            if (currentTile.group === rightTile.group || currentTile.group === downTile.group) return true;
        }
    }

    return false;
};