import pkg from 'pg';
import dotenv from 'dotenv';
const {Pool} = pkg;

dotenv.config();
export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    database: process.env.DB_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
});
