interface IInitConfig {
    tileSize:number,
    rowCount:number,
    columnCount:number,
    emptyTileBackground:string,
    tilesBackgrounds:Array<string>
}

interface IAnimateConfig {
    tailFallingDownSpeed:number,
    tailGrowingRate:number,
    tailGrowingStartSize:number
}

export const initConfig:IInitConfig = {
    tileSize: 80,
    rowCount: 5,
    columnCount: 5,
    emptyTileBackground: require('../assets/img/tiles/empty.png'),
    tilesBackgrounds: [
        require('../assets/img/tiles/block_5.png'),
        require('../assets/img/tiles/block_10.png'),
        require('../assets/img/tiles/block_20.png'),
        require('../assets/img/tiles/block_25.png'),
        require('../assets/img/tiles/block_50.png'),
        require('../assets/img/tiles/block_100.png')
    ]
};

export const animateConfig:IAnimateConfig = {
    tailFallingDownSpeed: 10,
    tailGrowingRate: 5,
    tailGrowingStartSize: 0
};