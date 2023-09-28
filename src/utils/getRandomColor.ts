import {config} from '../config';

export const getRandomColor = ():string => {
    const {colors} = config;

    return colors[Math.floor(Math.random() * colors.length)];
};