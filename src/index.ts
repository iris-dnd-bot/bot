import '@sapphire/plugin-editable-commands/register';
import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { env } from '@iris/utils/constants.js';

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

await client.login(env.DISCORD_TOKEN);
