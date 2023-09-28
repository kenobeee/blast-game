import {config} from '../config';

import {GetRandomColor} from '../type';

export const getRandomColor:GetRandomColor = () => {
    const {colors} = config;

    return colors[Math.floor(Math.random() * colors.length)];
};