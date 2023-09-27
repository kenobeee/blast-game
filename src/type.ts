export interface ITile {
    x:number,
    y:number,
    color:string
}

export type Board = Array<Array<ITile | null>>;

// foo

export type CreateBoard = () => Board;

export type DrawBoard = (props:{
    board:Board,
    ctx:CanvasRenderingContext2D
}) => void;

export type RemoveTiles = (props:{
    board:Board,
    clickedTiles:{
        row:number,
        col:number
    }
}) => Board;

export type UpdateBoard = (props:{
    newBoard:Board,
    ctx:CanvasRenderingContext2D
}) => void;