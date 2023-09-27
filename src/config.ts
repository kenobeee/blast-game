interface IConfig {
    tileSize:number,
    rowsCount:number,
    columnCount:number,
    colors:Array<string>
}

export const config:IConfig = {
    tileSize: 80,
    rowsCount: 5,
    columnCount: 5,
    colors: ['red', 'blue', 'green', 'yellow', 'purple']
};