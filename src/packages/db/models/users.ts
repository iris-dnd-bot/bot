import { Collection, User } from 'discord.js';
import { Db } from '../db.js';
import * as typings from '@iris/utils/types.js';
import { users } from '@prisma/client';

export class Users {
    cache: Collection<string, users>;

    constructor(public readonly db: Db) {
        this.cache = new Collection();
    }

    async create(user: User, data?: users) {
        const existing = await this.fetch(user).catch(() => -1);
        if (typeof existing === 'number') {
            return false;
        }
        if (!existing) {
            return this.db.$prisma.users
                .create({
                    data: {
                        ...data,
                        userId: user.id,
                    },
                })
                .then((data) => {
                    this.cache.set(user.id, data);
                    return data;
                });
        } else {
            this.cache.set(user.id, existing);
            return existing;
        }
    }

    get(user: User): typings.NullAble<users>;
    get(user: User, key: keyof users, fetch: true): Promise<users[typeof key]>;
    get(user: User, key: true): Promise<users>;
    get(user: User, key: keyof users): typings.NullAble<users[typeof key]>;
    get(user: User, keyOrFetch?: keyof users | boolean, fetch?: boolean) {
        if (!keyOrFetch) {
            return this.cache.get(user.id) ?? null;
        }
        if (fetch) {
            if (typeof keyOrFetch !== 'string') {
                return this.fetch(user);
            } else {
                return this.fetch(user, keyOrFetch);
            }
        } else {
            return this.cache.get(user.id)?.[keyOrFetch as keyof users];
        }
    }

    async update(user: User, data: Partial<users>) {
        const old = await this.fetch(user);
        if (!old) {
            return null;
        }
        if (old) {
            const newData = {
                ...old,
                ...data,
            };
            //@ts-expect-error
            delete newData.MongoId;
            return this.db.$prisma.users
                .update({
                    where: { MongoId: old.MongoId },
                    data: { ...newData },
                })
                .then((data) => {
                    this.cache.set(user.id, data);
                    return data;
                });
        }
    }
    fetch(
        user: User,
        key: keyof users,
    ): Promise<typings.NullAble<users[typeof key]>>;
    fetch(user: User): Promise<typings.NullAble<users>>;
    async fetch(user: User, key?: keyof users) {
        return this.db.$prisma.users
            .findFirst({
                where: {
                    userId: user.id,
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
