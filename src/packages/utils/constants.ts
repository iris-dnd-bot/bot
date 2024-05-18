import { ClientOptions, IntentsBitField, Options } from 'discord.js';
import { keys } from './functions.js';

export const CLIENT_OPTIONS: ClientOptions = {
    intents: keys(IntentsBitField.Flags),
    makeCache: Options.cacheEverything(),
};
