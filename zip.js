import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import { currentDir } from "./navigation.js";


export const compress = (filePathes) => {
    if(filePathes.length != 2) console.log('Operation failed');
    else {
        const readStream = createReadStream(join(currentDir, filePathes[0]));
        const writeStream = createWriteStream(join(currentDir, filePathes[1]));
        const zip = createBrotliCompress();
        readStream.on('error', (err) => console.log('Operation failed'));
        writeStream.on('error', (err) => console.log('Operation failed'))
        zip.on('error', (err) => console.log('Operation failed'))
        readStream.pipe(zip).pipe(writeStream);
        writeStream.on('finish', () => {
            console.log('file compressed successfully!');
            console.log(`You are in current working directory${currentDir}`)
        })
    }
}

export const decompress = (filePathes) => {
    if(filePathes.length != 2) console.log('Operation failed');
    else {
        const readStream = createReadStream(join(currentDir, filePathes[0]));
        const writeStream = createWriteStream(join(currentDir, filePathes[1]));
        const unZip = createBrotliDecompress();
        readStream.on('error', (err) => console.log('Operation failed'));
        writeStream.on('error', (err) => console.log('Operation failed'))
        unZip.on('error', (err) => console.log('Operation failed'))
        readStream.pipe(unZip).pipe(writeStream);
        writeStream.on('finish', () => {
            console.log('file compressed successfully!');
            console.log(`You are in current working directory${currentDir}`)
        })
    }
}