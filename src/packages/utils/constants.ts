import * as discord from 'discord.js';

export const VERSION = '1.0.0 [Canary]';

export const CLIENT_OPTIONS = {
    intents: [
        discord.GatewayIntentBits.AutoModerationConfiguration,
        discord.GatewayIntentBits.AutoModerationExecution,
        discord.GatewayIntentBits.DirectMessagePolls,
        discord.GatewayIntentBits.DirectMessageReactions,
        discord.GatewayIntentBits.DirectMessages,
        discord.GatewayIntentBits.DirectMessageTyping,
        discord.GatewayIntentBits.GuildEmojisAndStickers,
        discord.GatewayIntentBits.GuildIntegrations,
        discord.GatewayIntentBits.GuildInvites,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessagePolls,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.GuildMessages,
        discord.GatewayIntentBits.GuildMessageTyping,
        discord.GatewayIntentBits.GuildModeration,
        discord.GatewayIntentBits.GuildPresences,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildScheduledEvents,
        discord.GatewayIntentBits.GuildVoiceStates,
        discord.GatewayIntentBits.GuildWebhooks,
        discord.GatewayIntentBits.MessageContent,
    ],

    partials: [
        discord.Partials.Channel,
        discord.Partials.GuildMember,
        discord.Partials.GuildScheduledEvent,
        discord.Partials.Message,
        discord.Partials.Reaction,
        discord.Partials.ThreadMember,
        discord.Partials.User,
    ],
    fetchPrefix: async (msg: discord.Message) => {
        if (msg.guild) {
            return ['.', ''];
        }
        return ['.'];
    },
    makeCache: discord.Options.cacheEverything(),
} as const;
