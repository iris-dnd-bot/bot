import fs from 'fs';

interface CustomEnv {
    DISCORD_TOKEN: string;
    CLIENT_ID: string;
    ENV: 'dev' | 'prod' | 'prem';
    SUPPORT_SERVER: string;
}
const env = {} as CustomEnv;
export function getEnv() {
    const filedata = fs.readFileSync('./.config/.env', { encoding: 'utf-8' });
    for (const line of filedata.split('\n')) {
        if (!line.includes('=')) continue;
        const [NAME, ...data] = line.split('=');
        env[NAME as 'DISCORD_TOKEN'] = data.join('=');
    }

    if (!env.DISCORD_TOKEN) {
        throw new Error('no token provided.');
    }
    if (!env.ENV) {
        env.ENV = 'dev';
    }
    if (!env.SUPPORT_SERVER) {
        env.SUPPORT_SERVER = '<not provided>';
    }
    return env;
}
