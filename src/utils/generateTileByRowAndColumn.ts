import {initConfig} from '../config';
import {GenerateTileByRowAndColumn} from '../type';

export const generateTileByRowAndColumn:GenerateTileByRowAndColumn = (props) => {
    const {row, column} = props;
    const {tilesInfo, tileSize} = initConfig;

    const info = tilesInfo[Math.floor(Math.random() * tilesInfo.length)];

    return {
        x: column * tileSize,
        y: row * tileSize,
        ...info
    };
};