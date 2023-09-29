import {TileFallingDown} from '../type';

import {initConfig, animateConfig} from 'config';

export const fallDownTiles:TileFallingDown = (props) => {
    const {board, ctx} = props;
    const {columnCount, rowCount, tileSize} = initConfig;
    const {tailFallingDownSpeed} = animateConfig;
    const updatedBoard = [];

    const fallDownTiles = (props:{constX:number, startY:number, finishY:number, color:string}) => {
        const {constX, finishY, color} = props;
        let {startY} = props;

        startY += tailFallingDownSpeed;

        ctx.fillStyle = color;
        ctx.fillRect(constX, startY, tileSize, tileSize);

        if (startY < finishY) {
            ctx.clearRect(constX, startY, tileSize, tailFallingDownSpeed);
            requestAnimationFrame(() => fallDownTiles({finishY, constX, startY, color}));
        }
    };

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