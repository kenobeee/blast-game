export interface ITile {
    x:number,
    y:number,
    bg:string
}

export type Board = Array<Array<ITile | null>>;

// growing

export type GrowNewTileP = {
    constX:number,
    constY:number,
    startSize?:number,
    bg:HTMLImageElement,
    ctx:CanvasRenderingContext2D
};

export type FallDownTilesP = {
    constX:number,
    startY:number,
    finishY:number,
    bg:HTMLImageElement,
    ctx:CanvasRenderingContext2D,
    isTopmostTile:boolean
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
}) => Promise<Board>;

export type AddNewTiles = (props:{
    board:Board,
    growNewTile:IGrowingAnimateService['growNewTile']
}) => Board;

// utils

export type GetRandomBg = () => string;
export type GetTileRowColumnIndexesByXY = (x:number, y:number) => {row:number, column:number};