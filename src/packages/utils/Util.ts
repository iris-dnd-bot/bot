import childProcess from 'node:child_process';
import { urls } from './constants.js';

export function updateGitVersion() {
    const ref = childProcess
        .execSync('git rev-parse --verify HEAD')
        .toString()
        .slice(0, -1);

    return {
        url: `${urls.github.repo}/commit/${ref}`,
        hash: ref,
        short: ref.slice(0, 7),
    };
}

export class Utils {}
