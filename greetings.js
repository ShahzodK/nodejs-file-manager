import { currentDir } from "./navigation.js";

const username = process.argv.find(arg => arg.startsWith('--username')).slice(11);

export const greeting = () => {
    console.log(`Welcome to the File Manager, ${username}`);
    console.log(`You are in current working directory: ${currentDir}`)
}

export const exitApp = () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
}