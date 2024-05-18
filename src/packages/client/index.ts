import { CLIENT_OPTIONS } from '@iris/utils/constants.js';
import { getEnv } from '@iris/utils/functions.js';
import { Client } from 'discord.js';

export class IrisClient<Ready extends boolean = boolean> extends Client<Ready> {
    constructor() {
        super(CLIENT_OPTIONS);
    }

    async start() {
        await this.login(getEnv().DISCORD_TOKEN);
    }
}
