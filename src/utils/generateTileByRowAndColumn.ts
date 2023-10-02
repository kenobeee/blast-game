import {ITile} from '../type';
import {initConfig} from '../config';

export const generateTileByRowAndColumn = (props:{row:number, column:number}):ITile => {
    const {row, column} = props;
    const {tilesBackgrounds, tileSize} = initConfig;

    return {
        x: column * tileSize,
        y: row * tileSize,
        bg: tilesBackgrounds[Math.floor(Math.random() * tilesBackgrounds.length)]
    };
};