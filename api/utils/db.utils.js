import pgPromise from 'pg-promise';

const cn = {
    host: process.env.DB_HOST,
    port: process.env.BD_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
};

const pgp = pgPromise();
export const spyderdb = pgp(cn);