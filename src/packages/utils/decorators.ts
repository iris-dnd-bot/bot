import { createFunctionPrecondition } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Subcommand } from '@sapphire/plugin-subcommands';
import {
    CacheType,
    ChatInputCommandInteraction,
    Message,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
} from 'discord.js';

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
export function applyChatInputCommandOptions(
    fn: (builder: SlashCommandBuilder) => any,
) {
    return (cls: any) => {
        class T extends cls {
            public registerApplicationCommands(registry: Command.Registry) {
                registry.registerChatInputCommand(fn);
            }
        }

        return T as any;
    };
}

export function applySubCommandOptions(
    options: Subcommand.Options & { subcommands: any[] },
) {
    return (cls: any) => {
        class T extends cls {
            constructor(
                ctx: Subcommand.LoaderContext,
                opts: Subcommand.Options,
            ) {
                super(ctx, {
                    ...opts,
                    ...options,
                });
            }
        }

        return T as any;
    };
}

export function applySubSlashCommandOptions(
    fn: (
        builder: SlashCommandSubcommandBuilder,
    ) => SlashCommandSubcommandBuilder,
) {
    return (cls: any) => {
        class T extends cls {
            builder = fn(new SlashCommandSubcommandBuilder());
        }

        return T as any;
    };
}
