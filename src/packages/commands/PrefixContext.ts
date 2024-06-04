import { Args, SapphireClient, container } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import {
    EmbedBuilder,
    Message,
    MessageCreateOptions,
    PermissionResolvable,
} from 'discord.js';
import { CustomCommand } from './CustomCommand.js';
import { EMOTES, languages } from '@iris/utils/constants.js';
import { LanguageInterface } from '@iris/i18n/LanguageInterface.js';
import { Internationalization, i18n } from '@iris/i18n/i18nManager.js';

export class PrefixContext {
    msg: Message;
    cmd: CustomCommand;
    args: Args;
    language: languages;
    i18n: Internationalization;
    constructor(
        msg: Message,
        cmd: CustomCommand,
        args: Args,
        language: languages,
    ) {
        this.msg = msg;
        this.language = language;
        this.cmd = cmd;
        this.args = args;
        this.i18n = i18n;
    }

    lang<Key extends keyof LanguageInterface>(
        key: Key,
    ): LanguageInterface[Key] {
        return this.i18n.get(this.language, key);
    }

    hasPermissions(
        permission: PermissionResolvable,
        t: 'USER' | 'CLIENT' = 'USER',
    ) {
        switch (t) {
            case 'CLIENT':
                if (this.channel.isDMBased()) {
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

    async reply(
        content: string | Exclude<MessageCreateOptions, 'content'>,
        options?: Exclude<MessageCreateOptions, 'content'>,
    ) {
        if (typeof content !== 'string') {
            content = content.content!;
        }

        return this.send({
            ...(options || {}),
            content,
            allowedMentions: {
                repliedUser: false,
            },
            reply: { messageReference: this.msg, failIfNotExists: true },
        });
    }

    async say(
        content: string,
        options: Exclude<MessageCreateOptions, 'content'>,
    ) {
        return this.send({ ...options, content });
    }

    async success(message: string) {
        return this.send({ content: `${this.emote('success')}: ${message}` });
    }

    async error(type: 'USER' | 'OTHER', error: Error) {
        const embed = new EmbedBuilder();
        container.logger.error(error);

        switch (type) {
            case 'USER':
                embed.setDescription(
                    this.lang('commands:error')(
                        error,
                        type,
                        this.cmd.name,
                    ).replace(/{{error}}/g, this.emote('error')),
                );
                break;

            case 'OTHER':
                embed.setDescription(
                    [
                        `${this.emote('error')} failed to run: \`${error.message}\` `,
                    ].join(' '),
                );
        }
        return this.send({ content: '', embeds: [embed] });
    }

    async send(options: MessageCreateOptions) {
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
}
