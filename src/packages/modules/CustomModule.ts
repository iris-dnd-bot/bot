import { IrisClient } from '../core/clients/IrisClient.js';
import { ModuleHandler } from './ModuleHandler.js';

export interface CustomModuleOptions {
    id: string;
    category: string;
}

export abstract class CustomModule {
    client!: IrisClient;
    handler!: ModuleHandler<this>;

    constructor(public readonly options: CustomModuleOptions) {}

    abstract run(...args: unknown[]): unknown | Promise<unknown>;
}
