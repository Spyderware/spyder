import {HttpStatusCodes, Db} from '../utils/index.js';

export const createAccount = async (req, res) => {
    try {
        const {account_id, username} = req.body;
        const result = await Db.query('INSERT INTO account (account_id, username) VALUES ($1, $2)', [account_id, username]);
        return res.status(HttpStatusCodes.OK).send(result);
    } catch (e) {
        return res.status(HttpStatusCodes.InternalServerError).send({message: e.message});
    }
}

export const getAllAccounts = async (req, res) => {
    try {
        await Db.pool.query('SELECT * FROM account', (error, results) => {
                if (error) {
                    return res.status(HttpStatusCodes.InternalServerError).send({message: error.message});
                }
                res.status(200).json(results.rows)
            }
        )
    } catch (e) {
        return res.status(HttpStatusCodes.InternalServerError).send({message: e.message});
    }
}