import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { allowedLanguages, languages } from '@iris/utils/constants.js';
import { Collection } from 'discord.js';
import { EventEmitter } from 'node:events';
import { Language } from './Language.js';
import { LanguageInterface } from './LanguageInterface.js';
export class Internationalization extends EventEmitter {
    languages: Collection<'EN_US' | 'EN_GB', Language>;
    guildlanguages: Collection<string, languages>;
    constructor() {
        super({ captureRejections: true });
        this.languages = new Collection();

        this.guildlanguages = new Collection();
        this.loadAll();
    }

    get<key extends keyof LanguageInterface>(
        language: languages,
        key: key,
    ): LanguageInterface[key] {
        const lang = this.languages.get(parseLanguage(language));
        if (!lang)
            return this.languages.get(parseLanguage(languages.simpleEnglish))!
                .data[key];
        return lang.data[key];
    }

    async loadAll() {
        const p = path.join(process.cwd(), 'dist', 'languages');
        const files = fs.readdirSync(p);

        for (const file of files) {
            const data = await import(path.join(p, file));
            const mod = new data.default();
            const id = parseLanguage(mod.id);
            if (!allowedLanguages.includes(id)) {
                this.emit(
                    'error',
                    new Error('invalid language on file', {
                        cause: `(ID: ${id} | ${file})`,
                    }),
                );
                continue;
            }
            this.languages.set(id, mod);
            this.emit('LOAD', mod);
        }
    }
}

function parseLanguage(language: languages) {
    switch (language) {
        case languages.simpleEnglish:
            return 'EN_US';
        case languages.traditionalEnglish:
            return 'EN_GB';
        default:
            return 'EN_US';
    }
}
const _ = new Internationalization();
await _.loadAll();

export const i18n = _;
