import { prisma } from '@iris/db/db.js';
import { EMOTES } from '@iris/utils/constants.js';
import { Command, SapphireClient } from '@sapphire/framework';
import {
    EmbedBuilder,
    InteractionReplyOptions,
    PermissionResolvable,
} from 'discord.js';

export class InteractionContext {
    interaction: Command.ChatInputCommandInteraction;

    constructor(interaction: Command.ChatInputCommandInteraction) {
        this.interaction = interaction;
    }

    async embed(
        embed: ReturnType<EmbedBuilder['toJSON']>,
        options?: Exclude<InteractionReplyOptions, 'embeds'>,
    ) {
        if (options) {
            if (typeof options.content === 'undefined') {
                options.content = '';
            }
        } else {
            options = { content: '' };
        }

        return this.reply({
            ...options,
            embeds: [embed],
        });
    }

    async say(
        content: string,
        options?: Exclude<InteractionReplyOptions, 'content'>,
    ) {
        if (!options) {
            options = { embeds: [] };
        }

        const opts = {
            ...options,
            content,
        };

        return this.reply(opts);
    }

    async reply(options: InteractionReplyOptions) {
        if (this.interaction.replied) {
            return this.interaction.editReply(options);
        }
        return this.interaction.reply(options);
    }

    get db() {
        return prisma;
    }

    get user() {
        return this.interaction.user;
    }

    get member() {
        return this.interaction.member;
    }

    get channel() {
        return this.interaction.channel;
    }

    get guild() {
        return this.interaction.guild;
    }

    get client() {
        return this.interaction.client as SapphireClient<true>;
    }
    get options() {
        return this.interaction.options;
    }

    hasPermissions(
        permission: PermissionResolvable,
        t: 'USER' | 'CLIENT' = 'USER',
    ) {
        if (!this.channel) return false;
        if (this.channel.isDMBased()) {
            return permission === 'UseExternalEmojis';
        }
        switch (t) {
            case 'CLIENT':
                return this.channel
                    .permissionsFor(this.client.user)
                    ?.has(permission);

            case 'USER':
                return this.channel
                    .permissionsFor(this.user.id)
                    ?.has(permission);
        }
    }

    emote(emote: keyof (typeof EMOTES)['CUSTOM']) {
        if (!this.hasPermissions('UseExternalEmojis', 'CLIENT')) {
            return EMOTES.DEFAULT[emote];
        }
        return EMOTES.CUSTOM[emote];
    }

    async fail(
        content: string,
        options?: Exclude<InteractionReplyOptions, 'content'>,
    ) {
        options = {
            ...options,
            ephemeral: !this.interaction.replied,
        };
        return this.say(`${this.emote('error')} ${content}`, options);
    }

    async success(
        content: string,
        options?: Exclude<InteractionReplyOptions, 'content'>,
    ) {
        options = {
            ...options,
            ephemeral: !this.interaction.replied,
        };
        return this.say(`${this.emote('success')} ${content}`, options);
    }
}
