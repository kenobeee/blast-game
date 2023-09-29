import {TileFallingDown} from '../type';

import {initConfig, animateConfig} from 'config';

export const tileFallingDown:TileFallingDown = (props) => {
    const {board, fallDownTiles} = props;
    const {columnCount, rowCount, tileSize} = initConfig;
    const {tailFallingDownSpeed} = animateConfig;
    const updatedBoard = [];

    for (let column = 0; column < columnCount; column++)  {
        const currentColumn = board[column];

        // falling into updated columns only
        if (currentColumn.includes(null)) {
            // sorting...
            const tiles = currentColumn.filter(tile => tile !== null);
            const empties = currentColumn.filter(tile => tile === null);
            const newColumn = empties.concat(tiles);

            for (let row = 0; row < rowCount; row++) {
                const newIndex = newColumn.indexOf(currentColumn[row]);

                if (newIndex !== -1) {
                    const shift = newIndex - row;
                    const currentTile = currentColumn[row];

                    if (currentTile && shift > 0) {
                        // caching
                        // @ts-ignore
                        newColumn[newIndex] = {...newColumn[newIndex], y: currentTile.y + (tileSize * shift)};

                        // drawing
                        fallDownTiles({
                            constX: currentTile.x,
                            startY: currentTile.y - tailFallingDownSpeed,
                            finishY: currentTile.y + (tileSize * shift),
                            color: currentTile.color
                        });
                    }
                }
            }

            updatedBoard.push(newColumn);
        } else {
            updatedBoard.push(currentColumn);
        }
    }

    return updatedBoard;
};