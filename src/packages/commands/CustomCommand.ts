import { Command } from '@sapphire/framework';
import { InteractionContext } from './context/InteractionContext.js';
import { SlashCommandBuilder } from 'discord.js';
import { MetaData } from '@iris/utils/decorators.js';

export abstract class CustomCommand extends Command {
    builder!: SlashCommandBuilder;
    metadata!: MetaData;
    public async chatInputRun(
        interaction: Command.ChatInputCommandInteraction,
    ) {
        const options: Record<string, any> = {};

        if (interaction.options.data.length) {
            for (const opt of this.builder.options.map((o) => o.toJSON())) {
                const option = interaction.options.get(opt.name);
                if (opt) {
                    options[opt.name] = option;
                }
            }
        }
        const context = new InteractionContext(interaction, options);

        await this.interaction(context);
    }

    abstract interaction(ctx: InteractionContext): any;
}
