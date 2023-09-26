import {createBoard, drawBoard} from '@utils';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const board = createBoard();

// Инициализация игры
const init = () => drawBoard({board, ctx});

// Запуск игры
init();