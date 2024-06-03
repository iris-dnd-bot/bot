import { Args, Command } from '@sapphire/framework';
import { Locale, Message } from 'discord.js';
import { PrefixContext } from './PrefixContext.js';
import { parseLanguage } from '@iris/utils/Util.js';
import { CustomCommandError } from '@iris/errors/CustomCommandError.js';

export abstract class CustomCommand extends Command {
    async messageRun(msg: Message, args: Args) {
        const ctx = new PrefixContext(
            msg,
            this,
            args,
            parseLanguage(msg.guild?.preferredLocale ?? Locale.EnglishUS),
        );

        try {
            await this.run(ctx);
        } catch (error) {
            if (error instanceof CustomCommandError) {
                return ctx.error('USER', error);
            } else {
                await ctx.error('OTHER', error as Error);
            }
        }
    }

    abstract run(ctx: PrefixContext): any;
}
