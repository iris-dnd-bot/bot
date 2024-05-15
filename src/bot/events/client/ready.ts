import { IrisClient } from '../../../packages/core/clients/IrisClient.js';
import { ListenerModule } from '../../../packages/listeners/ListenerModule.js';

export default class ReadyEvent extends ListenerModule {
    constructor() {
        super({
            category: 'client',
            id: 'events.client.ready',
            event: 'ready',
            handler: 'client',
            type: 'once',
        });
    }
    run(client: IrisClient<true>) {
        client.logger.info('ready');
    }
}
