import { IrisModule, IrisModuleOptions } from '@iris/modules/IrisModule.js';

import { EventHandler } from './EventHandler.js';
import { Events } from 'discord.js';

export interface EventModuleOptions extends IrisModuleOptions {
    handler: string;
    event: string;
    type: 'on' | 'once';
}

export class EventModule extends IrisModule {
    //@ts-expect-error
    declare handler: EventHandler;
    declare options: EventModuleOptions;

    static events = Events;
}
