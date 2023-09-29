import {initConfig} from '../config';

import {GetTileRowColumnIndexesByXY} from '../type';

export const getTileRowColumnIndexesByXY:GetTileRowColumnIndexesByXY = (x, y) => {
    const {tileSize} = initConfig;

    return {
        row: Math.floor(y / tileSize),
        column: Math.floor(x / tileSize),
    };
};