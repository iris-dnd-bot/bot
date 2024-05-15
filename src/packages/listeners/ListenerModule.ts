import { CustomModule, CustomModuleOptions } from '../modules/CustomModule.js';

export interface ListenerModuleOptions extends CustomModuleOptions {
    event: string;
    handler: string;
    type: 'on' | 'once';
}

export abstract class ListenerModule extends CustomModule {
    declare options: ListenerModuleOptions;
    constructor(options: ListenerModuleOptions) {
        super(options);
    }
}
