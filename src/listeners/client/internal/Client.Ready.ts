import { Events, Listener, SapphireClient } from '@sapphire/framework';

export class ReadyListener extends Listener {
    public constructor(
        context: Listener.LoaderContext,
        options: Listener.Options,
    ) {
        super(context, {
            ...options,
            once: true,
            event: Events.ClientReady,
        });
    }
    run(client: SapphireClient<true>) {
        this.container.logger.info(
            `logged in as ${client.user.username} (${client.user.id})`,
        );
    }
}
