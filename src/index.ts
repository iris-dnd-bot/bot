import '@sapphire/plugin-logger/register';

import { GatewayIntentBits } from 'discord.js';
import { env } from '@iris/utils/constants.js';
import { Internationalization } from '@iris/i18n/i18nManager.js';
import { SapphireClient } from '@sapphire/framework';
import chalk from 'chalk';
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
    logger: {
        format: {
            info: {
                timestamp: { color: chalk.rgb(128, 8, 69), utc: false },
            },
        },
    },
});
const language = new Internationalization();
await language.loadAll();
await client.login(env.DISCORD_TOKEN);
