import { CustomCommand } from '@iris/commands/CustomCommand.js';
import { PrefixContext } from '@iris/commands/PrefixContext.js';
import { applyPrefixedCommandOptions } from '@iris/utils/decorators.js';
import crypto from 'crypto';
const REGEX = /(\+|\*|\-|\/)/;
@applyPrefixedCommandOptions({
    name: 'roll',
    enabled: true,
    description: 'rolls dice',
    aliases: ['dice'],
})
export class RollCommand extends CustomCommand {
    async run(ctx: PrefixContext) {
        console.log('running');
        const arg = await ctx.args.rest('string');
        const parsed = parseDice(arg);
        if (!parsed) {
            return ctx.error(ctx.errorTypes.USER, new Error());
        }
        let combined: number = 0;
        const rolls: number[] = [];
        console.log(parsed);

        for (let i = 0; i < parsed.length; i++) {
            for (let j = 0; j < parsed[i].length; j++) {
                const d = parsed[i][j];
                rolls.push(d.roll);
                combined += d.n;
            }
        }
        const content = [
            `Result of \`${arg}\`: (${combined})`,
            '```js',
            rolls.join(', '),
            '```',
            ``,
        ].join('\n');
        return ctx.reply({ embeds: [{ description: content }] });
    }
}

export function parseDice(
    input: string,
): { roll: number; n: number }[][] | null {
    if (input === null) {
        input = '1d20';
    }
    const [times, sides] = input.split('d').filter((v) => v !== '');
    const [side, operator = '+', multiplier = '0'] = sides.split(REGEX);
    if (isNaN(+multiplier)) {
        return null;
    }
    if (operator && !['+', '-'].includes(operator)) {
        return null;
    }
    let res = [];
    for (let i = 0; i < +times; i++) {
        res.push(
            roll(+side, `${operator}${multiplier.replaceAll(/\s+/g, '')}`),
        );
    }
    return res;
}
export function roll(sides: number, amplifier: string) {
    const res: { roll: number; n: number }[] = [];

    let r = getRandomIntInclusive(0, sides);
    if (r === 0) r = 1;
    res.push({ roll: r, n: r + +amplifier });

    return res;
}

function getRandomIntInclusive(min: number, max: number) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);

    // Convert the random value to a decimal between 0 and 1
    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    // Adjust the range
    min = Math.ceil(min);
    max = Math.floor(max);

    // Calculate the final random integer
    return Math.floor(randomNumber * (max - min + 1)) + min;
}
