import { EventModule, EventModuleOptions } from '@iris/events/EventModule.js';
import { applyOptions } from '@iris/utils/functions.js';
import { Events, Message, MessageType } from 'discord.js';

@applyOptions<EventModuleOptions>({
    category: 'events.client.message',
    id: 'events.client.message.ready',
    event: Events.MessageCreate,
    handler: 'client',
    type: 'on',
})
export default class ReadyEvent extends EventModule {
    async run(msg: Message<true>) {
        if (msg.system || msg.author.bot) return;
    }
}
