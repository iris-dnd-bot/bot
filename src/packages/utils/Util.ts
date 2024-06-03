import childProcess from 'node:child_process';
import { languages, urls } from './constants.js';
import { Locale } from 'discord.js';

export function updateGitVersion() {
    const ref = childProcess
        .execSync('git rev-parse --verify HEAD')
        .toString()
        .slice(0, -1);

    return {
        url: `${urls.github.repo}/commit/${ref}`,
        hash: ref,
        short: ref.slice(0, 7),
    };
}

export class Utils {}
export function parseLanguage(locale: Locale): languages {
    switch (locale) {
        case Locale.EnglishGB:
            return languages.traditionalEnglish;
        case Locale.EnglishUS:
            return languages.simpleEnglish;
        default:
            return languages.simpleEnglish;
    }
}
