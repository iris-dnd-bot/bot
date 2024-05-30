import '@sapphire/plugin-editable-commands/register';
import { SapphireClient } from '@sapphire/framework';
import { getEnv } from '@iris/utils/env.js';
import { GatewayIntentBits } from 'discord.js';

const client = new SapphireClient({
    intents: [
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
    fetchPrefix: (msg) => {
        msg;
        return [msg.client.user.toString(), ';'];
    },
    loadMessageCommandListeners: true,
});
const env = getEnv();

await client.login(env.DISCORD_TOKEN);
