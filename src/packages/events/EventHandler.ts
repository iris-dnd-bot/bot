import { IrisModuleHandler } from '@iris/modules/ModuleHandler.js';
import { EventEmitter } from 'node:events';
import { Collection } from 'discord.js';
import { EventModule } from './EventModule.js';

export class EventHandler extends IrisModuleHandler<EventModule> {
    handlers = new Collection<string, EventEmitter>();

    addHandlers(handlers: Record<string, EventEmitter>) {
        for (const name of Object.keys(handlers)) {
            this.addHandler(name, handlers[name]);
        }
    }

    addHandler(id: string, handler: EventEmitter) {
        if (this.handlers.has(id)) {
            throw new Error('ERROR:HANDLER_ALREADY_REGISTERED');
        }
        if (!(handler instanceof EventEmitter)) {
            throw new Error('ERROR:HANDLER_INVALID_TYPE');
        }

        this.handlers.set(id, handler);
        return this;
    }

    async loadAll() {
        await super.loadAll();

        for (const mod of this.modules.values()) {
            const handler = this.handlers.get(mod.options.handler);

            if (!handler) {
                throw new Error('ERROR:MOD_HAS_NO_HANDLER', {
                    cause: 'LOAD:LISTENER',
                });
            }
            handler[mod.options.type](mod.options.event, async (...args) => {
                return this.get(mod.options.id)?.run?.(...args);
            });
        }
    }
}
