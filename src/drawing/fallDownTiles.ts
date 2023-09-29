import {FallDownTilesP} from '../type';
import {animateConfig, initConfig} from '../config';

export const fallDownTiles = (props:FallDownTilesP) => {
    const {constX, color, finishY, ctx} = props;
    const {tileSize} = initConfig;
    const {tailFallingDownSpeed} = animateConfig;
    let {startY} = props;

    startY += tailFallingDownSpeed;

    ctx.fillStyle = color;
    ctx.fillRect(constX, startY, tileSize, tileSize);

    if (startY < finishY) {
        ctx.clearRect(constX, startY, tileSize, tailFallingDownSpeed);
        requestAnimationFrame(() => fallDownTiles({finishY, constX, startY, color, ctx}));
    }
};