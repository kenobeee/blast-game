import {IAnimateConfig, IGameConfig, IInitConfig, TileGroup} from './type';

export const initConfig:IInitConfig = {
    tileSize: 80,
    rowCount: 10,
    columnCount: 10,
    emptyTileBackground: require('../assets/img/tiles/empty.png'),
    tilesInfo: [
        {
            group: TileGroup.block5,
            score: 5,
            bg: require('../assets/img/tiles/block_5.png')
        },
        {
            group: TileGroup.block10,
            score: 10,
            bg: require('../assets/img/tiles/block_10.png')
        },
        {
            group: TileGroup.block20,
            score: 20,
            bg: require('../assets/img/tiles/block_20.png')
        },
        {
            group: TileGroup.block25,
            score: 25,
            bg: require('../assets/img/tiles/block_25.png')
        },
        {
            group: TileGroup.block50,
            score: 50,
            bg: require('../assets/img/tiles/block_50.png')
        },
        {
            group: TileGroup.block100,
            score: 100,
            bg: require('../assets/img/tiles/block_100.png')
        }
    ]
};

export const animateConfig:IAnimateConfig = {
    tailFallingDownSpeed: 10,
    tailGrowingRate: 5,
    tailGrowingStartSize: 0
};

// todo scoreTarget взависимости от кол-ва плиток
export const gameConfig:IGameConfig = {
    scoreTarget: initConfig.rowCount * initConfig.columnCount * 50,
    totalAvailableSteps: initConfig.rowCount * initConfig.columnCount / 2,
    totalAvailableShuffling: 5
};