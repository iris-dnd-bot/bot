import { Options, ClientOptions } from 'discord.js';
import path from 'node:path';
export const CLIENT_INTENTS = [
    'AutoModerationConfiguration',
    'AutoModerationExecution',
    'DirectMessagePolls',
    'DirectMessageReactions',
    'DirectMessages',
    'DirectMessageTyping',
    'GuildEmojisAndStickers',
    'GuildIntegrations',
    'GuildInvites',
    'GuildMembers',
    'GuildMessagePolls',
    'GuildMessageReactions',
    'GuildMessages',
    'GuildMessageTyping',
    'GuildModeration',
    'GuildPresences',
    'Guilds',
    'GuildScheduledEvents',
    'GuildVoiceStates',
    'GuildWebhooks',
    'MessageContent',
] as const;

export const CLIENT_OPTIONS: ClientOptions = {
    intents: CLIENT_INTENTS,
    makeCache: Options.cacheEverything(),
};

export const TIME_LOCALE = 'en-US';
export const TIME_FORMATER_OPTIONS = {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    hour12: false,
    weekday: 'long',
} as const;

export const EVENTS = {
    ERROR: 'error',
    LOAD: 'load',
};

export const PATHS = {
    EVENTS: path.resolve(process.cwd(), 'dist', 'bot', 'events'),
};
