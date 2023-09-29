interface IInitConfig {
    tileSize:number,
    rowCount:number,
    columnCount:number,
    backgroundColor:string,
    colors:Array<string>
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
    backgroundColor: 'white',
    colors: ['red', 'blue', 'green', 'yellow', 'purple']
};

export const animateConfig:IAnimateConfig = {
    tailFallingDownSpeed: 10,
    tailGrowingRate: 10,
    tailGrowingStartSize: 0
};