import { Command, CommandOptions } from '@iris/commands/defaults/Command.js';
import { SlashCommandBuilder } from 'discord.js';

export interface ChatInputCommandOptions extends CommandOptions {
    data: (builder: SlashCommandBuilder) => SlashCommandBuilder;
}

export class ChatInputCommand extends Command {
    builder!: ReturnType<SlashCommandBuilder['toJSON']>;
}
