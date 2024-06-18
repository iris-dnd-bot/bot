import {
    PrefixCommand,
    PrefixCommandOptions,
} from '@iris/commands/prefix/PrefixCommand.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<PrefixCommandOptions>({
    name: 'ping',
    description: '',
    meta: {
        examples: () => [],
        usage: () => ['[p]'],
    },
})
export class PingCommand extends PrefixCommand {}
