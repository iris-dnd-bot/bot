import { IrisModuleOptions } from '@iris/modules/IrisModule.js';
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

export function applyOptions<T extends IrisModuleOptions>(options: T) {
    return (cls: any) => {
        return class T extends cls {
            constructor() {
                super(options);
            }
        } as any;
    };
}
