import { Args, SapphireClient } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { Message, MessageCreateOptions } from 'discord.js';
import { CustomCommand } from './CustomCommand.js';

export class PrefixContext {
    msg: Message<true>;
    cmd: CustomCommand;
    args: Args;
    constructor(msg: Message<true>, cmd: CustomCommand, args: Args) {
        this.msg = msg;
        this.cmd = cmd;
        this.args = args;
    }

    async reply(options: MessageCreateOptions) {
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
