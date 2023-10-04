import {IAnimateConfig, IGameConfig, IInitConfig, TileGroup} from './type';

export const initConfig:IInitConfig = {
    tileSize: 80,
    totalRowsQty: 10,
    totalColumnQty: 10,
    emptyTileBackground: require('../assets/img/tiles/empty.png'),
    tilesInfo: [
        {
            group: TileGroup.block5,
            score: 5,
            bg: require('../assets/img/tiles/2d_block_5.png'),
            view: require('../assets/img/tiles/3d_block_5.png')
        },
        {
            group: TileGroup.block10,
            score: 10,
            bg: require('../assets/img/tiles/2d_block_10.png'),
            view: require('../assets/img/tiles/3d_block_10.png')
        },
        {
            group: TileGroup.block15,
            score: 15,
            bg: require('../assets/img/tiles/2d_block_15.png'),
            view: require('../assets/img/tiles/3d_block_15.png')
        },
        {
            group: TileGroup.block30,
            score: 30,
            bg: require('../assets/img/tiles/2d_block_30.png'),
            view: require('../assets/img/tiles/3d_block_30.png')
        },
        {
            group: TileGroup.block50,
            score: 50,
            bg: require('../assets/img/tiles/2d_block_50.png'),
            view: require('../assets/img/tiles/3d_block_50.png')
        },
        {
            group: TileGroup.block100,
            score: 100,
            bg: require('../assets/img/tiles/2d_block_100.png'),
            view: require('../assets/img/tiles/3d_block_100.png')
        }
    ]
};

export const animateConfig:IAnimateConfig = {
    tailFallingDownSpeed: 10,
    tailGrowingRate: 5,
    tailGrowingStartSize: 0
};

const availableScores = initConfig.tilesInfo.map(tile => tile.score);
const totalTiles = initConfig.totalRowsQty * initConfig.totalColumnQty;
const averageScorePerTile = availableScores.reduce((acc, score) => acc + score, 0) / availableScores.length;
const scoreTarget = totalTiles * averageScorePerTile;
const totalAvailableSteps = Math.ceil(scoreTarget / averageScorePerTile / initConfig.tilesInfo.length);

// todo scoreTarget взависимости от кол-ва плиток
export const gameConfig:IGameConfig = {
    scoreTarget,
    totalAvailableSteps
};