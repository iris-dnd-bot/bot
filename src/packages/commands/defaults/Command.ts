import { IrisModule, IrisModuleOptions } from '@iris/modules/IrisModule.js';

export interface CommandOptions extends IrisModuleOptions {
    name: string;
    data: any;
}

export class Command extends IrisModule {
    declare options: CommandOptions;
}
