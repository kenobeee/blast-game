import {GrowNewTileP} from '../type';

import {animateConfig, initConfig} from '../config';

export const growNewTile = (props:GrowNewTileP) => {
    const {constX, constY, color, ctx} = props;
    const {tileSize} = initConfig;
    const {tailGrowingRate, tailGrowingStartSize} = animateConfig;
    let {startSize = tailGrowingStartSize} = props;

    startSize += tailGrowingRate;

    ctx.fillStyle = color;
    ctx.fillRect(
        constX + tileSize / 2 - startSize / 2,
        constY + tileSize / 2 - startSize / 2,
        startSize,
        startSize);

    if (startSize < tileSize) {
        requestAnimationFrame(() => growNewTile({constX, constY, startSize, color, ctx}));
    }
};