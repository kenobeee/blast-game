import {config} from '../config';

import {GetTileRowColumnIndexesByXY} from '../type';

export const getTileRowColumnIndexesByXY:GetTileRowColumnIndexesByXY = (x, y) => {
    const {tileSize} = config;

    return {
        row: Math.floor(y / tileSize),
        column: Math.floor(x / tileSize),
    };
};