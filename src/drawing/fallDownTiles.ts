import {animateConfig, initConfig} from '../config';
import {ctx} from '../components';
import {FallDownTilesP} from '../type';

export const fallDownTiles = (props:FallDownTilesP) => {
    const {constX, bg, finishY, isTopmostTile} = props;
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
            fallDownTiles({finishY, constX, startY, bg, isTopmostTile}));
};