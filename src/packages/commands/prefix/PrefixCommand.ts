import { Command, CommandOptions } from '@sapphire/framework';
import { Message } from 'discord.js';
interface MetaData {
    usage: (msg: Message) => string[];
    examples: (msg: Message) => string[];
}

export interface PrefixCommandOptions extends CommandOptions {
    meta: MetaData;
}

export class PrefixCommand extends Command {
    constructor(context: Command.LoaderContext, options: PrefixCommandOptions) {
        super(context, options);
    }
}
