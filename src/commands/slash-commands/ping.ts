import { CustomCommand } from '@iris/commands/CustomCommand.js';
import { InteractionContext } from '@iris/commands/context/InteractionContext.js';
import { applyChatInputCommandOptions } from '@iris/utils/decorators.js';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { Message } from 'discord.js';

@applyChatInputCommandOptions((builder) => {
    return builder.setName('ping').setDescription('pings the bot.');
})
export class PingCommand extends CustomCommand {
    async interaction(ctx: InteractionContext) {
        const o = Date.now();
        const m = await ctx.say(
            PING_MESSAGES[Math.floor(Math.random() * PING_MESSAGES.length)],
            { ephemeral: true },
        );
        const ping = Math.round(Date.now() - o);
        if (isMessageInstance(m as Message)) {
            const dif = m.createdTimestamp - ctx.interaction.createdTimestamp;
            return ctx.say(`PONG! \`${dif}\`ms (\`${ping}\`ms) `);
        } else {
            return ctx.say(`PONG \`${ping}\`ms `);
        }
    }
}

const PING_MESSAGES = [
    'pinging NSA servers...',
    'pinging GOOGLE headquarter...',
    'pinging French Goverment...',
];
