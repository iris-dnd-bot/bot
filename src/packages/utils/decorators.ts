import { createFunctionPrecondition } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { CacheType, ChatInputCommandInteraction, Message } from 'discord.js';

export function applyPrefixedCommandOptions(options: Command.Options) {
    return (cls: any) => {
        class T extends cls {
            constructor(ctx: Command.LoaderContext, opts: Command.Options) {
                super(ctx, {
                    ...opts,
                    ...options,
                });
            }
        }

        return T as any;
    };
}

export function ownerOnly() {
    return createFunctionPrecondition(
        (msg: Message | ChatInputCommandInteraction<CacheType>) => {
            if (msg instanceof ChatInputCommandInteraction) {
                return ['1234788180046123080', '735199620803854428'].includes(
                    msg.user.id,
                );
            }
            return ['1234788180046123080', '735199620803854428'].includes(
                msg.author.id,
            );
        },
    );
}
