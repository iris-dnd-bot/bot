import { ClientOptions, IntentsBitField } from 'discord.js';
import { keys } from './functions.js';

/**
 * the client options for the discord bot.
 */
export const CLIENT_OPTIONS: ClientOptions = {
    intents: keys(IntentsBitField.Flags),
};
