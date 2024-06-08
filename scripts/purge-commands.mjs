import { REST, Routes } from 'discord.js';
import { getEnv } from '../dist/packages/utils/env.js';

const { DISCORD_TOKEN, CLIENT_ID } = getEnv();

const rest = new REST();
rest.setToken(DISCORD_TOKEN);

await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] });
