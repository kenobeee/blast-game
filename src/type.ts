export enum TileGroup {
    block5 = 'block_5',
    block10 = 'block_10',
    block20 = 'block_20',
    block25 = 'block_25',
    block50 = 'block_50',
    block100 = 'block_100'
}

export interface ITileInfo {
    group:TileGroup,
    score:number,
    bg:string,
    view:string
}

export interface ITile extends ITileInfo {
    x:number,
    y:number
}

export type Board = Array<Array<ITile | null>>;

// config

export interface IInitConfig {
    tileSize:number,
    rowCount:number,
    columnCount:number,
    emptyTileBackground:string,
    tilesInfo:Array<ITileInfo>
}

export interface IAnimateConfig {
    tailFallingDownSpeed:number,
    tailGrowingRate:number,
    tailGrowingStartSize:number
}

export interface IGameConfig {
    scoreTarget:number,
    totalAvailableSteps:number,
    totalAvailableShuffling:number
}

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

export interface IDrawingAnimateService {
    growNewTile:(props:Omit<GrowNewTileP, 'ctx'>) => void,
    fallDownTiles:(props:Omit<FallDownTilesP, 'ctx'>) => void,
}

// scene

export type InitBoard = (props:{
    growNewTile:IDrawingAnimateService['growNewTile']
}) => Board;

export type RemoveTiles = (props:{
    board:Board,
    growNewTile:IDrawingAnimateService['growNewTile']
    clickedTiles:{
        row:number,
        col:number
    },
    currentScore:number
}) => null | {board:Board, score:number};

export type TileFallingDown = (props:{
    board:Board,
    fallDownTiles:IDrawingAnimateService['fallDownTiles']
}) => Promise<Board>;

export type AddNewTiles = (props:{
    board:Board,
    growNewTile:IDrawingAnimateService['growNewTile']
}) => Board;

// utils

export type GenerateTileByRowAndColumn = (props:{row:number, column:number}) => ITile;
export type GetTileRowColumnIndexesByXY = (x:number, y:number) => {row:number, column:number};
export type GetRandomInt = (from:number, to:number) => number;