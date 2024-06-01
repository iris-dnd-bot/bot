import { Args, SapphireClient } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import {
    EmbedBuilder,
    Message,
    MessageCreateOptions,
    PermissionResolvable,
} from 'discord.js';
import { CustomCommand } from './CustomCommand.js';
import { EMOTES, env } from '@iris/utils/constants.js';

enum ErrorTypes {
    COMMAND,
    USER,
}

export class PrefixContext {
    msg: Message<true>;
    cmd: CustomCommand;
    args: Args;
    constructor(msg: Message<true>, cmd: CustomCommand, args: Args) {
        this.msg = msg;
        this.cmd = cmd;
        this.args = args;
    }

    hasPermissions(
        permission: PermissionResolvable,
        t: 'USER' | 'CLIENT' = 'USER',
    ) {
        switch (t) {
            case 'CLIENT':
                if (!this.channel.isTextBased()) {
                    return permission === 'UseExternalEmojis';
                }
                return this.channel
                    .permissionsFor(this.msg.client.user)
                    ?.has(permission);
        }
    }

    emote(emote: keyof (typeof EMOTES)['CUSTOM']) {
        if (!this.hasPermissions('UseExternalEmojis', 'CLIENT')) {
            return EMOTES.DEFAULT[emote];
        }
        return EMOTES.CUSTOM[emote];
    }

    async error(type: ErrorTypes, error: Error) {
        const isbeta = !!env.ENV;
        const embed = new EmbedBuilder();
        switch (type) {
            case ErrorTypes.COMMAND:
                const e = `${error.name}[${error.cause ?? 'UNKNOWN'}] ${error.message}`;
                embed.setDescription(
                    [
                        `${this.emote('error')} failed to run the ${this.cmd.name} command:`,
                        '```',
                        `${e}`,
                        '```',
                        isbeta
                            ? `if this error keeps persisting. please report it on github.`
                            : [
                                  'if this error keeps persisting',
                                  ` please report it in the support server ${env.SUPPORT_SERVER} `,
                              ].join(','),
                    ].join('\n'),
                );
                break;

            case ErrorTypes.USER:
                embed.setDescription(
                    [
                        `${this.emote('error')} failed to run: \`${error.message}\` `,
                    ].join(' '),
                );
        }
        return this.reply({ content: '', embeds: [embed] });
    }

    async reply(options: MessageCreateOptions) {
        if (options.content && !options.embeds) {
            options.embeds = [];
        }
        if (options.embeds?.length && !options.content) {
            options.content = '';
        }
        return send(this.msg, options);
    }

    get channel() {
        return this.msg.channel;
    }

    get client() {
        return this.msg.client as SapphireClient<true>;
    }

    get author() {
        return this.msg.author;
    }

    get member() {
        return this.msg.member;
    }

    get errorTypes() {
        return ErrorTypes;
    }
}
