import { Command } from './Command.js';

export class CommandContext {
    cmd: Command;
    constructor(cmd: Command) {
        this.cmd = cmd;
    }
}
