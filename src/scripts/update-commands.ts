import { getEnv } from '@iris/utils/functions.js';
import { REST, Routes } from 'discord.js';
const { DISCORD_TOKEN, CLIENT_ID } = getEnv();

const rest = new REST();
rest.setToken(DISCORD_TOKEN);

async function resetCommands() {
    await rest.put(Routes.applicationCommands(CLIENT_ID));
}

if (process.argv.includes('--reset')) {
    await resetCommands();
}
