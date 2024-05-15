import fs from 'fs';
import path from 'path';

interface CustomEnv {
    DISCORD_TOKEN: string;
    USER_ID: string;
    OWNER_IDS: string[];
}
function _checkEnv(key: string) {
    const keys = ['DISCORD_TOKEN', 'USER_ID', 'OWNER_IDS'];
    return keys.includes(key);
}

export function getEnv(): CustomEnv {
    const env = {} as CustomEnv;
    const file = fs.readFileSync(
        path.resolve(path.join(process.cwd(), '.config', '.env')),
        { encoding: 'utf-8' },
    );
    const lines = file.split('\n');
    for (const line of lines) {
        const [name, ...value] = line.split('=');
        if (_checkEnv(name)) {
            if (name === 'OWNER_IDS') {
                env['OWNER_IDS'] = value.join('=').split(',');
            } else {
                env[name as 'DISCORD_TOKEN'] = value.join('=');
            }
        }
    }
    return env;
}
