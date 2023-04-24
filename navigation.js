import { homedir } from 'os';
import { join } from 'path';
import { readdir, stat } from 'fs/promises';
import { access } from 'fs';

export let currentDir = homedir();
export const upCurrentDir = async () => {
    currentDir = join(currentDir,'../');
    return currentDir
}
export const goToOtherDir = (pathName) => {
    access(join(currentDir, pathName), (err) => {
        if(err) {
            console.log('No such directory exists!');
            console.log(`You are in current working directory: ${currentDir}`);
        }
        else {
            currentDir = join(currentDir, pathName);
            console.log(`You are in current working directory: ${currentDir}`);
            return currentDir;
        }
    })
    return currentDir;
}

export const showCurrentDirContents = async () => {
    try {
        const content = await readdir(currentDir);
        const promises = content.map(async item => {
            const stats = await stat(join(currentDir, item));
            const fileType = stats.isFile() ? 'file' : 'directory';
            return {'Name': item, 'Type': fileType};
        })
        const fl = (await Promise.all(promises)).sort((a, b) => {
            if(a.Type > b.Type) return 1;
            else if(a.Type == b.Type)  {
                if(a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
                else return -1
            }
            else return -1
        });
        console.table(fl);
    } catch (err) {
        console.log('Operation failed');
        console.log(err);
    }
}
