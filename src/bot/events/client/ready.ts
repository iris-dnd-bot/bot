import { IrisClient } from '@iris/client/index.js';
import { EventModule, EventModuleOptions } from '@iris/events/EventModule.js';
import { applyOptions } from '@iris/utils/functions.js';
import { ActivityType } from 'discord.js';

@applyOptions<EventModuleOptions>({
    category: 'events.client',
    id: 'events.client.ready',
    event: 'ready',
    handler: 'client',
    type: 'on',
})
export default class ReadyEvent extends EventModule {
    async run(client: IrisClient<true>) {
        console.log(`${client.user.username} is now ready.`);
        client.user.setStatus('idle', 0);
        client.user.setPresence({
            activities: [
                {
                    type: ActivityType.Watching,
                    name: 'a DND session',
                },
            ],
        });
        return;
    }
}
