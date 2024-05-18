import { IrisClient } from '@iris/client/index.js';
import { IrisModuleHandler } from './ModuleHandler.js';

export interface IrisModuleOptions {
    id: string;
    category: string;
}
export class IrisModule {
    handler!: IrisModuleHandler<this>;
    client!: IrisClient;

    options: IrisModuleOptions;

    constructor(options: IrisModuleOptions) {
        this.options = options;
    }

    run?(...args: unknown[]): unknown | Promise<unknown>;
}
