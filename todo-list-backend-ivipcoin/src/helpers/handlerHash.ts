import {compare, hash} from 'bcrypt';

const COMPLEXITY_ENCRYT = 8;

export const generateHash = async (password: string) => hash(password, COMPLEXITY_ENCRYT);

export const compareHash = async (password: string, hashed: string) => await compare(password, hashed);