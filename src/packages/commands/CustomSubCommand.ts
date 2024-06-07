import { SubCommandContext } from './context/SubCommandContext.js';
import { Subcommand } from '@sapphire/plugin-subcommands';
import { ChatInputCommand } from '@sapphire/framework';

export abstract class CustomSubCommand {
    abstract name: string;
    async chatInputRun(
        interaction: Subcommand.ChatInputCommandInteraction,
        context: ChatInputCommand.RunContext,
    ) {
        const ctx = new SubCommandContext(interaction, context);

        await this.run(ctx).catch(console.error);
    }

    abstract run(ctx: SubCommandContext): any;
}
