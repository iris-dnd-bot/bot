import { CustomCommand } from '@iris/commands/CustomCommand.js';
import { PrefixContext } from '@iris/commands/PrefixContext.js';
import {
    applyPrefixedCommandOptions,
    ownerOnly,
} from '@iris/utils/decorators.js';

@applyPrefixedCommandOptions({
    name: 'eval',
    description: 'bwa',
})
export class EvalCommand extends CustomCommand {
    @ownerOnly()
    async run(ctx: PrefixContext) {
        ctx;
        console.log('true');
    }
}
