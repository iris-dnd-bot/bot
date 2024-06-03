export const CUSTOM_ERROR_KEYS = {
    COMMAND_INPUT_INVALID: 'invalid command input. please try again.',
    ROLL_INVALID: '',
    ROLL_INVALID_SIZES: 'invalid command input.',
};

export class CustomCommandError extends Error {
    constructor(id: keyof typeof CUSTOM_ERROR_KEYS, cause?: string) {
        super(CUSTOM_ERROR_KEYS[id]);
        this.cause = cause || 'COMMAND';
    }
}
