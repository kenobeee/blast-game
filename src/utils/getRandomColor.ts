import {initConfig} from '../config';

import {GetRandomColor} from '../type';

export const getRandomColor:GetRandomColor = () => {
    const {colors} = initConfig;

    return colors[Math.floor(Math.random() * colors.length)];
};