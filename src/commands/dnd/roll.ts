import { applyPrefixedCommandOptions } from '@iris/utils/decorators.js';
import { Command } from '@sapphire/framework';

@applyPrefixedCommandOptions({
    name: 'roll',
    enabled: true,
})
export class RollCommand extends Command {}
