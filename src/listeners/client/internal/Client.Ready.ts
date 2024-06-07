import { version } from '@iris/utils/constants.js';
import { Events, Listener, SapphireClient } from '@sapphire/framework';
import { Db, prisma } from '@iris/db/db.js';

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
    async run(client: SapphireClient<true>) {
        await Db.connect();
        this.container.logger.info(
            `logged in as ${client.user.username} (${client.user.id}) [${version}]`,
        );

        for (const guild of client.guilds.cache.values()) {
            await prisma.guilds.create(guild);
            this.container.logger.info(
                `[DB] added ${guild.name} (${guild.id}) to the db.`,
            );
        }
    }
}
