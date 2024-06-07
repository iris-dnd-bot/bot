import { Command } from '@sapphire/framework';
import { InteractionContext } from './context/InteractionContex.js';

export abstract class CustomCommand extends Command {
    public async chatInputRun(
        interaction: Command.ChatInputCommandInteraction,
    ) {
        const context = new InteractionContext(interaction);
        await this.interaction(context);
    }

    abstract interaction(ctx: InteractionContext): any;
}
