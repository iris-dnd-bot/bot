import pathlib from 'node:path';
import console from 'node:console';
import fs from 'node:fs';
import tsconfig from '../tsconfig.json' with { type: 'json' };
import process from 'node:process';
const DEBUG = false;
/**
 * reads all files.
 * @returns {string[]}
 */
function readAllFiles() {
    const directory = pathlib.resolve(process.cwd(), 'dist');
    const res = [];
    console.log(directory);

    (async function read(dir) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filepath = pathlib.join(dir, file);

            if (fs.statSync(filepath).isDirectory()) {
                read(filepath);
            } else {
                res.push(filepath);
            }
        }
    })(directory);

    return res;
}

const files = readAllFiles();

console.log(`[INFO] found ${files.length} total files..`);
const paths = Object.keys(tsconfig.compilerOptions.paths);
let i = 0;

for (const file of files) {
    const content = fs.readFileSync(file, { encoding: 'utf-8' });
    let newContent = content;
    let updated = false;
    for (const path of paths) {
        if (newContent.includes(path.replaceAll('*', ''))) {
            const name = file.replace(process.cwd(), '$ROOT');
            if (!updated) {
                log(`[INFO] updating ${name}...`);
            }
            const npath =
                pathlib.resolve(
                    process.cwd(),
                    'dist',
                    tsconfig.compilerOptions.paths[path][0].replaceAll('*', ''),
                ) + '/';
            newContent = newContent.replaceAll(path.replaceAll('*', ''), npath);
            log(`[INFO] updated ${name}...`);
            updated = true;
        }
    }
    if (updated) {
        i++;
    }
    fs.writeFileSync(file, newContent);
}
console.log(`[INFO] updated ${i}/${files.length} file${i === 1 ? '' : 's'}.`);

function log(...data) {
    if (!DEBUG) return;
    return console.log(...data);
}
