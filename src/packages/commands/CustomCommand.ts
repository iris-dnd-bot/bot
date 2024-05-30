import { Args, Command, UserError } from '@sapphire/framework';
import { Message } from 'discord.js';
import { PrefixContext } from './PrefixContext.js';

export abstract class CustomCommand extends Command {
    async messageRun(msg: Message<true>, args: Args) {
        const ctx = new PrefixContext(msg, this, args);
        try {
            await this.run(ctx);
        } catch (error) {
            if (error instanceof UserError) {
                return ctx.reply({ content: "bro you f'd up man", embeds: [] });
            }
        }
    }

    abstract run(ctx: PrefixContext): any;
}
