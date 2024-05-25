import { EventModule } from '@iris/events/EventModule.js';
import { applyOptions } from '@iris/utils/functions.js';
import { Message } from 'discord.js';

@applyOptions('EVENT', {
    id: 'client.message.create',
    category: 'message',
    event: EventModule.events.MessageCreate,
    handler: 'client',
    type: 'on',
})
export default class MessageEvents extends EventModule {
    async run(msg: Message<true>) {
        if (msg.system || msg.author.bot) return;
    }
}
