import fs from 'node:fs';
import pathlib from 'node:path';

/**
 * Object.keys is untyped. this fixes it by adding a custom filter to it
 * @param thing the object you want to check for
 * @param only_string whenever you want the keys to only be strings (enum types)
 * @returns the list of keys.
 */

export function keys<T extends object>(
    thing: T,
    only_string = true,
    filter = (t: string) => typeof t !== 'undefined',
): (keyof T)[] {
    return Object.keys(thing).filter((str) => {
        if (only_string) {
            //@ts-expect-error
            if (typeof str === 'number' || typeof thing[str] !== 'string') {
                return false;
            }
        }
        return filter(str);
    }) as (keyof T)[];
}

export function getEnv() {
    const envFile = pathlib.join(
        pathlib.resolve(process.cwd()),
        '.config',
        '.env',
    );
    const data = fs.readFileSync(envFile, {
        encoding: 'utf-8',
    });
    if (!data.length) {
        throw new Error('[');
    }
}
