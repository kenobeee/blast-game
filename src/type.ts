export enum TileGroup {
    block5 = 'block_5',
    block10 = 'block_10',
    block15 = 'block_15',
    block30 = 'block_30',
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
    totalRowsQty:number,
    totalColumnQty:number,
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
    shufflingQty:number
}

// growing

export type GrowNewTileP = {
    constX:number,
    constY:number,
    startSize?:number,
    bg:HTMLImageElement
};

export type FallDownTilesP = {
    constX:number,
    startY:number,
    finishY:number,
    bg:HTMLImageElement,
    isTopmostTile:boolean
};

// scene

export type InitBoard = () => Board;

export type RemoveTiles = (props:{
    board:Board,
    clickedTiles:{
        row:number,
        col:number
    },
    currentScore:number
}) => null | {board:Board, score:number};

export type TileFallingDown = (props:{
    board:Board
}) => Promise<Board>;

export type AddNewTiles = (props:{
    board:Board
}) => Board;

// utils

export type GenerateTileByRowAndColumn = (props:{row:number, column:number}) => ITile;
export type GetTileRowColumnIndexesByXY = (x:number, y:number) => {row:number, column:number};
export type GetRandomInt = (from:number, to:number) => number;
export type CheckClusterAvailability = (board:Board) => boolean;