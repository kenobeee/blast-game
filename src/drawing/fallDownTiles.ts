import {FallDownTilesP} from '../type';
import {animateConfig, initConfig} from '../config';

export const fallDownTiles = (props:FallDownTilesP) => {
    const {constX, bg, finishY, ctx, isTopmostTile} = props;
    const {tileSize} = initConfig;
    const {tailFallingDownSpeed} = animateConfig;
    let {startY} = props;

    startY += tailFallingDownSpeed;

    // tail cleaning
    if (isTopmostTile)
        ctx.clearRect(
            constX,
            startY - tailFallingDownSpeed,
            tileSize,
            tailFallingDownSpeed
        );

    ctx.drawImage(bg, constX, startY, tileSize, tileSize);

    if (startY < finishY)
        requestAnimationFrame(() =>
            fallDownTiles({finishY, constX, startY, bg, ctx, isTopmostTile}));
};