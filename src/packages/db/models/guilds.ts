import { Collection, Guild } from 'discord.js';
import { Db } from '../db.js';
import * as typings from '@iris/utils/types.js';
import { guilds } from '@prisma/client';

export class Guilds {
    cache: Collection<string, guilds>;

    constructor(public readonly db: Db) {
        this.cache = new Collection();
    }
    get(guild: Guild): typings.NullAble<guilds>;
    get(
        guild: Guild,
        key: keyof guilds,
        fetch: true,
    ): Promise<guilds[typeof key]>;
    get(guild: Guild, key: true): Promise<guilds>;
    get(guild: Guild, key: keyof guilds): typings.NullAble<guilds[typeof key]>;
    get(guild: Guild, keyOrFetch?: keyof guilds | boolean, fetch?: boolean) {
        if (!keyOrFetch) {
            return this.cache.get(guild.id) ?? null;
        }
        if (fetch) {
            if (typeof keyOrFetch !== 'string') {
                return this.fetch(guild);
            } else {
                return this.fetch(guild, keyOrFetch);
            }
        } else {
            return this.cache.get(guild.id)?.[keyOrFetch as keyof guilds];
        }
    }

    async update(guild: Guild, data: Partial<guilds>) {
        const old = await this.fetch(guild);
        if (!old) {
            return null;
        }
        if (old) {
            const newData = {
                ...old,
                ...data,
            };
            return this.db.$prisma.guilds
                .update({
                    where: { MongoId: newData.MongoId },
                    data: { ...newData },
                })
                .then((data) => {
                    this.cache.set(guild.id, data);
                    return data;
                });
        }
    }

    async create(guild: Guild) {
        const existing = await this.fetch(guild).catch((e) => {
            console.error(e);
            return -1;
        });
        if (typeof existing === 'number') {
            return null;
        }
        if (!existing) {
            return this.db.$prisma.guilds
                .create({
                    data: {
                        guildId: guild.id,
                        prefix: ['.'],
                    },
                })
                .then((data) => {
                    this.cache.set(guild.id, data);
                    return data;
                });
        } else {
            this.cache.set(guild.id, existing);
            return existing;
        }
    }

    fetch(
        guild: Guild,
        key: keyof guilds,
    ): Promise<typings.NullAble<guilds[typeof key]>>;
    fetch(guild: Guild): Promise<typings.NullAble<guilds>>;
    async fetch(guild: Guild, key?: keyof guilds) {
        return this.db.$prisma.guilds
            .findFirst({
                where: {
                    guildId: guild.id,
                },
            })
            .then((data) => {
                if (!data) return null;
                if (key) {
                    return data[key];
                } else {
                    return data;
                }
            });
    }
}
