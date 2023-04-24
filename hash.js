import { createHash } from 'crypto';
import { readFile } from 'fs';
import { join } from 'path';
import { currentDir } from './navigation.js';

export const calculateHash = (pathName) => {
    readFile(join(currentDir, pathName), 'utf8', (err, text) => {
        if(err) console.log('Operation failed');
        else console.log(createHash('sha256').update(text).digest('hex'));
    })
};