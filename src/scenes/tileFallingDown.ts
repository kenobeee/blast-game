import {ITile, TileFallingDown} from '../type';
import {animateConfig, initConfig} from 'config';
import {pause} from '@utils';

export const tileFallingDown:TileFallingDown = async (props) => {
    const {board, fallDownTiles} = props;
    const {columnCount, rowCount, tileSize} = initConfig;
    const updatedBoard:Array<Array<ITile | null>> = [];
    let maxShift:number = 0;

    const columnAsyncCycle = (column:number) => {
        if (column === columnCount) return;

        const currentColumn = board[column];
        const columnHasEmptyTiles = currentColumn.includes(null);

        // falling into updated columns only
        if (columnHasEmptyTiles) {
            // sorting...
            const tiles = currentColumn.filter(tile => tile !== null);
            const empties = currentColumn.filter(tile => tile === null);
            const newColumn = empties.concat(tiles);

            const rowAsyncCycle = (row:number, isTopmostTile:boolean) => {
                if (row === rowCount) return;

                const newIndex = newColumn.indexOf(currentColumn[row]);

                if (newIndex !== -1) {
                    const shift = newIndex - row;
                    const currentTile = currentColumn[row];

                    if (currentTile && shift > 0) {
                        // for future pause
                        maxShift = shift > maxShift ? shift : maxShift;

                        // caching
                        // @ts-ignore
                        newColumn[newIndex] = {...newColumn[newIndex], y: currentTile.y + (tileSize * shift)};

                        const imageBg = new Image();

                        imageBg.src = currentTile.bg;
                        fallDownTiles({
                            constX: currentTile.x,
                            startY: currentTile.y,
                            // @ts-ignore
                            finishY: newColumn[newIndex].y,
                            bg: imageBg,
                            isTopmostTile
                        });
                    }
                }

                row++;

                rowAsyncCycle(row, false);
            };

            rowAsyncCycle(0, true);

            updatedBoard.push(newColumn);
        } else {
            updatedBoard.push(currentColumn);
        }

        column++;

        columnAsyncCycle(column);
    };

    await columnAsyncCycle(0);
    // waiting until end of animation
    await pause(maxShift * initConfig.tileSize / animateConfig.tailFallingDownSpeed * 20);

    return updatedBoard;
};