import { currentDir } from "./navigation.js";
import { createReadStream, rename, writeFile, createWriteStream, unlink } from 'fs';
import { join } from 'path';
import { pipeline } from "stream";

export const readFile = (file) => {
    const stream = createReadStream(join(currentDir, file));
    stream.on('data', (chunk) => process.stdout.write(`${chunk}\n`));
    stream.on('end', () => stream.close());
    stream.on('error', (err) => console.log(('Operation failed!')));
}

export const createFile = (fileName) => {
    writeFile(join(currentDir, fileName), '', { flag: 'wx' }, (err) => {
        if (err) {
            if(err.message.startsWith('EEXIST')) console.log('file already exist!')
            else console.log('Operation failed!');
        }
        else console.log('File succesfully created!')
    })
}
export const renameFile = (filePathes) => {
    rename(join(currentDir, filePathes[0]), join(currentDir, filePathes[1]), (err) => {
        if(err) console.log('Operation failed');
        else console.log('File successfully renamed!');
    });
}

export const copyFile = async (filePathes) => {
    await pipeline(
        createReadStream(join(currentDir, filePathes[0])),
        createWriteStream(join(currentDir, filePathes[1])),
        (err) => {
            if (err) {
                console.log('Operation failed');
                console.log(err)
            }
            else console.log('File successfully copied!')
        }
)
}

export const moveFile = async (filePathes) => {
    await pipeline(
        createReadStream(join(currentDir, filePathes[0])),
        createWriteStream(join(currentDir, filePathes[1])),
        (err) => {
            if (err) {
                console.log('Operation failed');
            }
            else {
                unlink(join(currentDir, filePathes[0]), (err) => {
                    if(err) {
                        console.log('Operation failed')
                    } 
                    else console.log('File succesfully moved!')
                })
            }
        }
    )
}

export const removeFile = (filePath) => {
    unlink(join(currentDir, filePath), (err) => {
        if(err) {
            console.log('Operation failed')
        } 
        else console.log('File succesfully removed!')
    })
}