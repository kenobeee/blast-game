interface IInitConfig {
    tileSize:number,
    rowCount:number,
    columnCount:number,
    colors:Array<string>
}

export const initConfig:IInitConfig = {
    tileSize: 80,
    rowCount: 5,
    columnCount: 5,
    colors: ['red', 'blue', 'green', 'yellow', 'purple']
};