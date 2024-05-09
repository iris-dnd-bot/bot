import { Options, ClientOptions } from 'discord.js';

export const intents = [
  'AutoModerationConfiguration',
  'AutoModerationExecution',
  'DirectMessagePolls',
  'DirectMessageReactions',
  'DirectMessages',
  'DirectMessageTyping',
  'GuildEmojisAndStickers',
  'GuildIntegrations',
  'GuildInvites',
  'GuildMembers',
  'GuildMessagePolls',
  'GuildMessageReactions',
  'GuildMessages',
  'GuildMessageTyping',
  'GuildModeration',
  'GuildPresences',
  'Guilds',
  'GuildScheduledEvents',
  'GuildVoiceStates',
  'GuildWebhooks',
  'MessageContent',
] as const;

export const CLIENT_OPTIONS: ClientOptions = {
  intents,
  makeCache: Options.cacheEverything(),
};
