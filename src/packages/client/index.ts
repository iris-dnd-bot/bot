import { EventHandler } from '@iris/events/EventHandler.js';
import { CLIENT_OPTIONS } from '@iris/utils/constants.js';
import { getEnv } from '@iris/utils/functions.js';
import { Client } from 'discord.js';
import { resolve } from 'node:path';

export class IrisClient<Ready extends boolean = boolean> extends Client<Ready> {
    eventhandler: EventHandler;

    constructor() {
        super(CLIENT_OPTIONS);

        this.eventhandler = new EventHandler(this, {
            directory: resolve(process.cwd(), 'dist', 'bot', 'events'),
        });
    }

    async start() {
        this.eventhandler.addHandler('client', this);
        await this.eventhandler.loadAll();

        await this.login(getEnv().DISCORD_TOKEN);
    }
}
