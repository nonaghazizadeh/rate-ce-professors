import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: resolve(__dirname, '../../.env')});

export const HOST = process.env.DB_HOST;
export const USER = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASS;
export const DB = process.env.DB_NAME;
export const dialect = process.env.DB_DIALECT;
export const port = process.env.DB_PORT;