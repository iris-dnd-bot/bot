import { EventEmitter } from 'node:events';
import { IrisClient } from '../core/clients/IrisClient.js';
import fs from 'node:fs/promises';
import path from 'node:path';
import { CustomModule } from './CustomModule.js';
import { Collection } from 'discord.js';
import { EVENTS } from '../utils/constants.js';
interface _MockModule {
    default: typeof CustomModule;
}

export interface ModuleHandlerOptions {
    directory: string;
    automateCategories: boolean;
}

export class ModuleHandler<
    T extends CustomModule = CustomModule,
> extends EventEmitter {
    public client: IrisClient;
    public options: ModuleHandlerOptions;

    public modules: Collection<string, T>;
    constructor(client: IrisClient, options: ModuleHandlerOptions) {
        super({ captureRejections: true });
        this.client = client;
        this.options = options;

        this.modules = new Collection();
    }

    async loadAll() {
        const files = await this.readAllFiles();

        for (const file of files) {
            try {
                const data = await ximport<_MockModule>(file);
                //@ts-expect-error
                const constructed = new data.default();
                constructed.client = this.client;
                constructed.handler = this;

                this.modules.set(constructed.options.id, constructed);
                this.emit(EVENTS.LOAD, constructed);
            } catch (error) {
                console.log(error);

                this.emit(EVENTS.ERROR, { file, error });
            }
        }
    }

    // async version of: https://github.com/discord-akairo/discord-akairo/blob/master/src/struct/AkairoHandler.js#L234
    async readAllFiles() {
        const directory = this.options.directory;
        const res: string[] = [];
        console.log(directory);

        (async function read(dir: string) {
            const files = await fs.readdir(dir);
            console.log(files);

            for (const file of files) {
                const filepath = path.join(dir, file);
                console.log(filepath);

                if ((await fs.stat(filepath)).isDirectory()) {
                    await read(filepath);
                } else {
                    res.push(filepath);
                }
            }
        })(directory);
        console.log(res);

        return res;
    }
}

async function ximport<T>(file: string): Promise<T> {
    return import(file);
}
