export interface ITile {
    x:number,
    y:number,
    color:string
}

export type Board = Array<Array<ITile | null>>;

// scene

export type CreateBoard = (props:{
    ctx:CanvasRenderingContext2D
}) => Board;
export type RemoveTiles = (props:{
    board:Board,
    clickedTiles:{
        row:number,
        col:number
    }
}) => Board;

// utils

export type GetRandomColor = () => string;
export type GetTileRowColumnIndexesByXY = (x:number, y:number) => {row:number, column:number};