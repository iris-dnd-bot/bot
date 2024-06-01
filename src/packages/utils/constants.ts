import { getEnv } from './env.js';

export const EMOTES = {
    DEFAULT: {
        error: ':x:',
        success: '✔️',
        loading: '⌛',
    },
    CUSTOM: {
        error: '<:error:1246132516058955869>',
        success: '<:success:1246132512690933782>',
        loading: '<a:loading:1246132514838282321>',
    },
};

export const env = getEnv();
