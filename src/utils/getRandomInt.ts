import {GetRandomInt} from '../type';

export const getRandomInt:GetRandomInt = (from, to) =>
    Math.floor(Math.random() * (to - from + 1)) + from;