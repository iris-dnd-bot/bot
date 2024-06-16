import { enumerable } from '@iris/utils/decorators.js';
import { Command } from '@sapphire/framework';
import { APIEmbed, Message } from 'discord.js';
import { MessageOptions, send } from '@sapphire/plugin-editable-commands';

export class Context {
    @enumerable(false)
    private $msg: Message;

    private $cmd: Command;

    constructor(msg: Message, cmd: Command) {
        this.$msg = msg;

        this.$cmd = cmd;
    }

    get msg() {
        return this.$msg;
    }

    get content() {
        return this.msg.content;
    }

    get cmd() {
        return this.$cmd;
    }

    async embed(embed: APIEmbed, options?: MessageOptions) {
        return this.$send({
            ...options,
            embeds: [...(options?.embeds ?? []), embed],
        });
    }

    async say(conntent: string, options?: MessageOptions) {
        return this.$send({
            ...options,
            content: conntent,
        });
    }

    async reply(content: string, options?: MessageOptions) {
        const noptions = {
            ...options,
            content: content,
            reply: {
                messageReference: this.msg,
                failIfNotExists: false,
            },
        };
        return this.$send(noptions);
    }

    private async $send(options: MessageOptions) {
        if (missing(options.content)) {
            options.content = '';
        }
        if (missing(options.components)) {
            options.components = [];
        }
        if (missing(options.embeds)) {
            options.embeds = [];
        }
        return send(this.msg, options);
    }
}

function missing(t: unknown): t is undefined {
    return typeof t === 'undefined';
}
