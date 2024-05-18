import { IrisClient } from '@iris/client/index.js';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import { IrisCollection } from '@iris/utils/Collection.js';
import { IrisModule } from './IrisModule.js';
export interface IrisModuleHandlerOptions {
    directory: string;
}

export class IrisModuleHandler<T extends IrisModule> extends EventEmitter {
    client: IrisClient;
    modules: IrisCollection<T>;
    options: IrisModuleHandlerOptions;

    constructor(client: IrisClient, options: IrisModuleHandlerOptions) {
        super({ captureRejections: true });
        this.client = client;
        this.options = options;
        this.modules = new IrisCollection();
    }

    get(id: string): T | undefined {
        return this.modules.get(id);
    }

    async loadAll() {
        const files = this.readdirRecursive(this.options.directory);
        for (const file of files) {
            const data = await import(file);
            if (data.default) {
                const mod = new data.default();
                mod.client = this.client;
                mod.handler = this;
                this.modules.add(mod);
                this.emit('load', mod);
            }
        }
    }

    readdirRecursive(directory: string) {
        const result = [];

        (function read(dir) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filepath = path.join(dir, file);

                if (fs.statSync(filepath).isDirectory()) {
                    read(filepath);
                } else {
                    result.push(filepath);
                }
            }
        })(directory);

        return result;
    }
}
