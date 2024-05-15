import { Client } from 'discord.js';
import { CLIENT_OPTIONS, PATHS } from '../../utils/constants.js';
import { getEnv } from '../../utils/env.js';
import { TimeUtil } from '../../utils/Time.js';
import { Logger } from '../../logger/index.js';
import { ListenerHandler } from '../../listeners/ListenerHandler.js';

export class IrisClient<Ready extends boolean = boolean> extends Client<Ready> {
    time = new TimeUtil();
    logger = new Logger();
    events = new ListenerHandler(this, {
        automateCategories: true,
        directory: PATHS.EVENTS,
    });
    constructor() {
        super(CLIENT_OPTIONS);
    }

    async run() {
        this.logger.info('starting discord bot...');
        this.logger.info('loading event handlers...');
        await this.events.loadAll();
        this.logger.info(`loaded ${this.events.modules.size} event handlers`);
        await this.login(getEnv().DISCORD_TOKEN);
        this.logger.info('connected to the discord gateway');
    }
}
