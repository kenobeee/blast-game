interface IConfig {
    tileSize:number,
    numRows:number,
    numCols:number,
    colors:Array<string>
}

export const config:IConfig = {
    tileSize: 80,
    numRows: 5,
    numCols: 5,
    colors: ['red', 'blue', 'green', 'yellow', 'purple']
};