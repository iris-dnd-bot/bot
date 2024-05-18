import { Collection } from 'discord.js';

export class IrisCollection<
    V extends { options: { id: string } },
> extends Collection<string, V> {
    add(thing: V) {
        return this.set(thing.options.id, thing);
    }
}
