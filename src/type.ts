export interface ITile {
    x:number,
    y:number,
    color:string
}

export type Board = Array<Array<ITile | null>>;

// scene

export type InitBoard = (props:{
    ctx:CanvasRenderingContext2D,
}) => Board;
export type RemoveTiles = (props:{
    board:Board,
    ctx:CanvasRenderingContext2D,
    clickedTiles:{
        row:number,
        col:number
    }
}) => Board | null;
export type TileFallingDown = (props:{
    board:Board,
    ctx:CanvasRenderingContext2D
}) => Board;
export type AddNewTiles = (props:{
    board:Board,
    ctx:CanvasRenderingContext2D
}) => Board;

// utils

export type GetRandomColor = () => string;
export type GetTileRowColumnIndexesByXY = (x:number, y:number) => {row:number, column:number};