import {AddNewTiles} from '../type';
import {initConfig} from '../config';
import {generateTileByRowAndColumn} from '@utils';
import {growNewTile} from '@drawing';

export const addNewTiles:AddNewTiles = (props) => {
    const {board} = props;
    const {totalColumnQty} = initConfig;

    for (let column = 0; column < totalColumnQty; column++) {
        const currentColumn = board[column];
        const emptyTilesCount = currentColumn.filter(tile => tile === null).length;

        if (emptyTilesCount !== 0) {
            for (let row = 0; row < emptyTilesCount; row++) {
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
                currentColumn[row] = newTile;
            }
        }
    }

    return board;
};