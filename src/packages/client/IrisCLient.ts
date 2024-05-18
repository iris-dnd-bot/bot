import { Client } from 'discord.js';
import { CLIENT_OPTIONS } from '../utils/constants.js';

export class IrisClient<Ready extends boolean = boolean> extends Client<Ready> {
    constructor() {
        super(CLIENT_OPTIONS);
    }

    async run() {
        await super.login();
    }
}
