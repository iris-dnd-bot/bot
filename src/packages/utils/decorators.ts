import { InteractionContext } from '@iris/commands/context/InteractionContext.js';
import { createFunctionPrecondition } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { Subcommand } from '@sapphire/plugin-subcommands';
import {
    CacheType,
    ChatInputCommandInteraction,
    Message,
    PermissionResolvable,
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
} from 'discord.js';
import { dmPermissions } from './constants.js';

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

export function setPermissions(permission: PermissionResolvable) {
    return createFunctionPrecondition((msg: Message | InteractionContext) => {
        if (msg instanceof InteractionContext) {
            return msg.hasPermissions(permission, 'USER');
        }
        if (msg.channel.isDMBased()) {
            return dmPermissions.includes(permission);
        }
        const perms = msg.channel.permissionsFor(msg.author.id);
        if (perms === null) return false;
        return perms.has(permission);
    });
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
        const f = fn(new SlashCommandBuilder());
        class T extends cls {
            builder = f;
            public registerApplicationCommands(registry: Command.Registry) {
                registry.registerChatInputCommand(() => {
                    return f;
                });
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

export interface MetaData {
    name: string;
    category: string;
    description?: string;
    examples?: Array<string>;
    id?: string;
    nsfw?: boolean;
    details?: string;
    usage?: string;
}
export function addMetaData(meta: MetaData) {
    return (cls: any) => {
        class T extends cls {
            metadata = meta;
        }
        return T as any;
    };
}
