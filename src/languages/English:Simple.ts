import { env, languages, urls } from '@iris/utils/constants.js';
import { Language } from '@iris/i18n/Language.js';

export default class EN_US extends Language {
    id = languages.simpleEnglish;
    data = {
        'commands:ping:init': 'ping...',
        'commands:ping:done': (ws: number, api: number) =>
            `Pong! (Websocket: \`${ws}\`ms; Api: \`${api}\`ms)`,
        'commands:roll:result': (
            input: string,
            rolls: number[],
            total: number,
        ) =>
            [
                `{{success}} Result of \`${input}\`: (${total})`,
                '```js',
                rolls.join(', '),
                '```',
            ].join('\n'),
        'commands:error': (err: Error, type: 'USER' | 'OTHER', cmd: string) => {
            const isbeta = !!env.ENV;
            const e = `${err.name}[${err.cause ?? 'UNKNOWN'}] ${err.message}`;
            if (type === 'USER') {
                return [
                    `{{error}} failed to run: \`${err.message || '<not provided>'}\` `,
                ].join(' ');
            }
            if (type == 'OTHER') {
                return [
                    `{{err}} failed to run the ${cmd} command:`,
                    '```',
                    e,
                    '```',
                    isbeta
                        ? `if this error keeps persisting. please report it on github.`
                        : [
                              'if this error keeps persisting',
                              ` please report it in the [support server](${urls.support.discord}) or on [github](${urls.support.github}) `,
                          ].join(','),
                ].join('\n');
            }
            throw err;
        },
    };
}
