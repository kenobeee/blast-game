import {AddNewTiles} from '../type';
import {initConfig} from '../config';
import {getRandomColor} from '@utils';

export const addNewTiles:AddNewTiles = (props) => {
    const {board, growNewTile} = props;
    const {columnCount, tileSize} = initConfig;

    for (let column = 0; column < columnCount; column++) {
        const currentColumn = board[column];
        const emptyTilesCount = currentColumn.filter(tile => tile === null).length;

        if (emptyTilesCount !== 0) {
            for (let row = 0; row < emptyTilesCount; row++) {
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
                currentColumn[row] = {
                    x: tileXCoordinate,
                    y: tileYCoordinate,
                    color: tileColor
                };
            }
        }
    }

    return board;
};