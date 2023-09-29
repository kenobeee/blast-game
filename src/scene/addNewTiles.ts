import {AddNewTiles} from '../type';
import {initConfig, animateConfig} from '../config';
import {getRandomColor} from '@utils';

export const addNewTiles:AddNewTiles = (props) => {
    const {board, ctx} = props;
    const {columnCount, tileSize} = initConfig;
    const {tailGrowingRate, tailGrowingStartSize} = animateConfig;

    const growNewTile = (props:{constX:number, constY:number, startSize:number, color:string}) => {
        const {constX, constY, color} = props;
        let {startSize} = props;

        startSize += tailGrowingRate;

        ctx.fillStyle = color;
        ctx.fillRect(
            constX + tileSize / 2 - startSize / 2,
            constY + tileSize / 2 - startSize / 2,
            startSize,
            startSize);

        if (startSize < tileSize) {
            requestAnimationFrame(() => growNewTile({constX, constY, startSize, color}));
        }
    };

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
                    startSize: tailGrowingStartSize,
                    constX: tileXCoordinate,
                    constY: tileYCoordinate
                });

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