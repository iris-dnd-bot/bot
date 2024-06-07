import { ChatInputCommand } from '@sapphire/framework';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { InteractionContext } from './InteractionContex.js';

export class SubCommandContext extends InteractionContext {
    context: ChatInputCommand.RunContext;

    constructor(
        interaction: Subcommand.ChatInputCommandInteraction,
        context: ChatInputCommand.RunContext,
    ) {
        super(interaction);
        this.context = context;
    }
}
