import { Command } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { EmbedBuilder, Message } from 'discord.js';

export class PingCommand extends Command {
    constructor(ctx: Command.LoaderContext, opts: Command.Options) {
        super(ctx, {
            ...opts,
            name: 'ping',
            description: 'BONG',
        });
    }

    async messageRun(msg: Message) {
        const m = await send(msg, 'pong...');
        const embed = new EmbedBuilder();
        embed.setDescription(
            `Pong! Bot Latency ${
                this.container.client.ws.ping
            }ms. API Latency ${m.createdTimestamp - msg.createdTimestamp}ms.`,
        );

        return send(msg, { content: '', embeds: [embed] });
    }
}
