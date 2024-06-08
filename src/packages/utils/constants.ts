import { updateGitVersion } from './Util.js';
import { getEnv } from './env.js';
import pjson from '../../../package.json' with { type: 'json' };
import { PermissionResolvable } from 'discord.js';
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
        issues: 'https://github.com/iris-dnd-bot/bot/issues',
        pr: 'https://github.com/iris-dnd-bot/bot/pulls',
    },
    support: {
        github: 'https://github.com/iris-dnd-bot/bot/issues',
        discord: env.SUPPORT_SERVER,
    },
};
export const git = updateGitVersion();
export const version = pjson.version + '/' + git.short;

export const versionfull = `${pjson.version}/[${git.short}](${git.url}) `;

export enum languages {
    simpleEnglish,
    traditionalEnglish,
}

export const allowedLanguages = ['EN_US', 'EN_GB'] as const;

export const dmPermissions: PermissionResolvable[] = [
    'AddReactions',
    'AttachFiles',
    'EmbedLinks',
    'ReadMessageHistory',
    'SendMessages',
    'ViewChannel',
];
