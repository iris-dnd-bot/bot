import { updateGitVersion } from './Util.js';
import { getEnv } from './env.js';
import pjson from '../../../package.json' with { type: 'json' };
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

export const urls = {
    github: {
        repo: 'https://github.com/iris-dnd-bot/bot/',
    },
    support: {
        github: 'https://github.com/iris-dnd-bot/bot/issues',
        discord: env.SUPPORT_SERVER,
    },
};
export const git = updateGitVersion();
export const version = pjson.version + '/' + git.short;

export const versionfull = `${pjson.version}/[${git.short}](${git.url}) `;
