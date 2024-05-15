import chalk from 'chalk';
import { TimeUtil } from '../utils/Time.js';

enum LogTypes {
    LOG = 'LOG',
    ERROR = 'ERROR',
    INFO = 'INFO',
    DEBUG = 'DEBUG',
}

const Colors = {
    TIME: (thing: string) => hex('#B00BA5')(thing),
    [LogTypes.LOG]: () => hex('#34edda')('LOG'),
    [LogTypes.ERROR]: () => hex('#ed3449')('ERROR'),
    [LogTypes.INFO]: () => hex('#34e0ed')('INFO'),
    [LogTypes.DEBUG]: () => hex('#BEAD69')('DEBUG'),
};
Colors;

export class Logger {
    types = LogTypes;
    time = new TimeUtil();

    debug(message: string) {
        return this.log(message, LogTypes.DEBUG);
    }

    error(error: Error, where: string) {
        return this.log(`[${where}] ${error.message}`, LogTypes.ERROR);
    }

    info(message: string) {
        return this.log(message, LogTypes.INFO);
    }

    log(message: string, type: LogTypes) {
        console.log(
            `[${this.time.logger(Date.now(), true)}] <${Colors[type]()}> ${message}`,
        );
    }
}

function hex(hex: string) {
    return chalk.hex(hex);
}
