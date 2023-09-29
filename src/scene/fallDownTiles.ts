import {TileFallingDown} from '../type';

import {initConfig} from 'config';

export const fallDownTiles:TileFallingDown = (props) => {
    const {board, ctx} = props;
    const {columnCount, rowCount, tileSize} = initConfig;
    const updatedBoard = [];

    const fallDownTiles = (props:{constX:number, startY:number, finishY:number, speed:number, color:string}) => {
        const {speed, constX, finishY, color} = props;
        let {startY} = props;

        startY += speed;

        ctx.fillStyle = color;
        ctx.fillRect(constX, startY, tileSize, tileSize);

        if (startY < finishY) {
            ctx.clearRect(constX, startY, tileSize, speed);
            requestAnimationFrame(() => fallDownTiles({speed, finishY, constX, startY, color}));
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
                            speed: 10,
                            constX: currentTile.x,
                            startY: currentTile.y - 10,
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