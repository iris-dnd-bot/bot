import { CustomCommand } from '@iris/commands/CustomCommand.js';
import { PrefixContext } from '@iris/commands/PrefixContext.js';
import { applyPrefixedCommandOptions } from '@iris/utils/decorators.js';

@applyPrefixedCommandOptions({
    name: 'ping',
    description: 'pings the bot',
})
export class PingCommand extends CustomCommand {
    async run(ctx: PrefixContext) {
        console.log('running');
        const first = Date.now();
        await ctx.reply({ content: ctx.lang('commands:ping:init') });
        const apiping = Date.now() - first;
        const wsping = ctx.client.ws.ping;
        return ctx.reply({
            content: ctx.lang('commands:ping:done')(wsping, apiping),
        });
    }
}
