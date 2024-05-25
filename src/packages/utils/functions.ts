import { EventModuleOptions } from '@iris/events/EventModule.js';
import { ChatInputCommandOptions } from '@iris/interactions/chat-input/ChatInputCommand.js';
import fs from 'fs';
export function keys<T extends object>(thing: T): (keyof T)[] {
    return Object.keys(thing) as (keyof T)[];
}
interface CustomEnv {
    DISCORD_TOKEN: string;
    CLIENT_ID: string;
}
const env = {} as CustomEnv;
export function getEnv() {
    const filedata = fs.readFileSync('./.config/.env', { encoding: 'utf-8' });
    for (const line of filedata.split('\n')) {
        if (!line.includes('=')) continue;
        const [NAME, ...data] = line.split('=');
        env[NAME as 'DISCORD_TOKEN'] = data.join('=');
    }

    return env;
}

export function applyOptions(t: 'CHAT_INPUT',options: ChatInputCommandOptions,): any;
export function applyOptions(t: 'EVENT', options: EventModuleOptions): any;
export function applyOptions(
    t: 'CHAT_INPUT' | 'EVENT',
    options: ChatInputCommandOptions | EventModuleOptions,
): any {
    t;
    return (cls: any) => {
        return class T extends cls {
            constructor() {
                super(options);
            }
        } as any;
    };
}
