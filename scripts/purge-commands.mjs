import { REST, Routes } from 'discord.js';
import { getEnv } from './helpers/env.mjs';

const { DISCORD_TOKEN, CLIENT_ID } = getEnv();

const rest = new REST();
rest.setToken(DISCORD_TOKEN);

await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] });
