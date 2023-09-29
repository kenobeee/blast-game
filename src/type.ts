export interface ITile {
    x:number,
    y:number,
    color:string
}

export type Board = Array<Array<ITile | null>>;

// growing

export type GrowNewTileP = {
    constX:number,
    constY:number,
    startSize?:number,
    color:string,
    ctx:CanvasRenderingContext2D
};

export type FallDownTilesP = {
    constX:number,
    startY:number,
    finishY:number,
    color:string,
    ctx:CanvasRenderingContext2D
};

export interface IGrowingAnimateService {
    growNewTile:(props:Omit<GrowNewTileP, 'ctx'>) => void,
    fallDownTiles:(props:Omit<FallDownTilesP, 'ctx'>) => void,
}

// scene

export type InitBoard = (props:{
    growNewTile:IGrowingAnimateService['growNewTile']
}) => Board;

export type RemoveTiles = (props:{
    board:Board,
    growNewTile:IGrowingAnimateService['growNewTile']
    clickedTiles:{
        row:number,
        col:number
    }
}) => Board | null;

export type TileFallingDown = (props:{
    board:Board,
    fallDownTiles:IGrowingAnimateService['fallDownTiles']
}) => Board;

export type AddNewTiles = (props:{
    board:Board,
    growNewTile:IGrowingAnimateService['growNewTile']
}) => Board;

// utils

export type GetRandomColor = () => string;
export type GetTileRowColumnIndexesByXY = (x:number, y:number) => {row:number, column:number};