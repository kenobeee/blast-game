export interface ITile {
    x:number,
    y:number,
    color:string
}

export type Board = Array<Array<ITile>>;

// foo

export type CreateBoard = () => Board;

export type DrawBoard = (props:{
    board:Board,
    ctx:CanvasRenderingContext2D
}) => void;

export type RemoveTiles = (props:{
    board:Board,
    row:number,
    col:number
}) => Board;