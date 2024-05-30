import fs from 'fs';

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
