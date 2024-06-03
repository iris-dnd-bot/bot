export interface LanguageInterface {
    'commands:ping:init': string;
    'commands:ping:done': (ws: number, api: number) => string;
    'commands:roll:result': (
        input: string,
        rolls: number[],
        total: number,
    ) => string;
    'commands:error': (
        error: Error,
        type: 'USER' | 'OTHER',
        cmd: string,
    ) => string;
}
