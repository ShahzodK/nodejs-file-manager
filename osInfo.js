import { EOL, cpus, userInfo, arch } from 'os';

export const getEOL = () => console.log(EOL);
export const getCpusInfo = () => console.log(cpus());
export const getUsername = () => console.log(userInfo().username);
export const getArchitecture = () => console.log(arch())