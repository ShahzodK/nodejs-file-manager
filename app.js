import * as readline from 'readline';
import * as navigation from './navigation.js';
import * as fileOperations from './fileOperations.js';
import * as osInfo from './osInfo.js';
import * as hash from './hash.js';
import * as greetings from './greetings.js'
import * as zip from './zip.js'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

greetings.greeting();

let exitCalls = 0;

rl.on('line', (command) => {
    if (command.trim() === '.exit') {
      if(exitCalls < 1) {
        exitCalls = 1;
        greetings.exitApp();
        rl.close();
      }
    }  else if(command === 'up') {
        navigation.upCurrentDir();
        console.log(`You are in current working directory: ${navigation.currentDir}`);
    }
      else if(command.startsWith('cd')) {
        const filePath = command.slice(3).trim()             
        navigation.goToOtherDir(filePath);
      }
      else if(command == 'ls') {
        navigation.showCurrentDirContents();
        console.log(`You are in current working directory: ${navigation.currentDir}`);
      }
      else if(command.startsWith('cat')) { 
        const filePath = command.slice(3).trim()             
        fileOperations.readFile(filePath);
        console.log(`You are in current working directory: ${navigation.currentDir}`);
      }
      else if(command.startsWith('add')) {  
        const filePath = command.slice(3).trim()      
        fileOperations.createFile(filePath);
        console.log(`You are in current working directory: ${navigation.currentDir}`);
      }
      else if(command.startsWith('rn')) {
        const filePathes = command.slice(2).trim().split(' ');     
        fileOperations.renameFile(filePathes);
        console.log(`You are in current working directory: ${navigation.currentDir}`);
      }
      else if(command.startsWith('cp')) {
        const filePathes = command.slice(2).trim().split(' ');     
        fileOperations.copyFile(filePathes);
        console.log(`You are in current working directory: ${navigation.currentDir}`);
      }
      else if(command.startsWith('mv')) {
        const filePathes = command.slice(2).trim().split(' ');     
        fileOperations.moveFile(filePathes);
        console.log(`You are in current working directory: ${navigation.currentDir}`);
      }
      else if(command.startsWith('rm')) {
        const filePath = command.slice(2).trim();     
        fileOperations.removeFile(filePath);
        console.log(`You are in current working directory: ${navigation.currentDir}`);
      }
      else if(command == 'os --EOL') {
        osInfo.getEOL();
      }
      else if(command == 'os --cpus') {
        osInfo.getCpusInfo();
      }
      else if(command == 'os --homedir') {
        console.log(navigation.currentDir);
      }
      else if(command == 'os --username') {
        osInfo.getUsername();
      }
      else if(command == 'os --architecture') {
        osInfo.getArchitecture();
      }
      else if(command.startsWith('hash')) {
        const filePath = command.slice(4).trim();     
        hash.calculateHash(filePath);
      }
      else if(command.startsWith('compress')) {
        const filePathes = command.slice(8).trim().split(' ');     
        zip.compress(filePathes);
      }
      else if(command.startsWith('decompress')) {
        const filePathes = command.slice(10).trim().split(' ');     
        zip.decompress(filePathes);
      }
       else {
        rl.prompt();
    }
    rl.prompt();
})

process.on('exit', () => {
  if(exitCalls < 1) {
    greetings.exitApp();
  }
});