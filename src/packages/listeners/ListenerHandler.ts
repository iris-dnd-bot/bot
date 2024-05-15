import { Collection } from 'discord.js';
import { ModuleHandler } from '../modules/ModuleHandler.js';
import { ListenerModule } from './ListenerModule.js';
import { EventEmitter } from 'node:events';
export class ListenerHandler extends ModuleHandler<ListenerModule> {
    public handlers: Collection<string, EventEmitter> = new Collection();

    async loadAll(): Promise<void> {
        await super.loadAll();
        this.handlers.set('client', this.client);
        console.log(this.modules.size);

        for (const value of this.modules.values()) {
            const handler = this.handlers.get(value.options.handler);
            if (!handler) continue;
            handler.on(value.options.event, async (...args: any[]) => {
                return this.modules.get(value.options.id)?.run(...args);
            });
        }
    }

    setEmitters(emitters: Record<string, EventEmitter>) {
        for (const key of Object.keys(emitters)) {
            if (key === 'client') continue;
            this.handlers.set(key, emitters[key]);
        }
    }
}
