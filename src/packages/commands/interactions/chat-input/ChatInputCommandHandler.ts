import { IrisModuleHandler } from '@iris/modules/ModuleHandler.js';
import { ChatInputCommand } from './ChatInputCommand.js';
import { CommandInteraction } from 'discord.js';

export class ChatInputCommandHandler extends IrisModuleHandler<ChatInputCommand> {
    async handle(interaction: CommandInteraction) {
        if (!interaction.command) {
        }
        const name = interaction.command?.name;

        const cmd = this.modules.find((cmd) => cmd.builder.name === name);
        if (!cmd) {
            return;
        }
    }
}
