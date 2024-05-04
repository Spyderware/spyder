import {HttpStatusCodes, Db} from '../utils/index.js';

export const createAccount = async (req, res) => {
    try {
        const {uid, username} = req.body;
        if (!uid || !username) {
            res.status(HttpStatusCodes.BadRequest).send({message: "Invalid payload"});
        } else {
            await Db.db.oneOrNone('SELECT * FROM account WHERE uid = $1 OR username = $2', [uid, username])
                .then(async data => {
                    if (data) {
                        res.status(HttpStatusCodes.Conflict).send({message: "Account already exists"});
                    } else {
                        await Db.db.none('INSERT INTO account(uid, username) VALUES(${uid}, ${username})', {
                            uid: uid,
                            username: username
                        });
                        return res.status(HttpStatusCodes.OK).send({message: 'Account created successfully.'});
                    }
                })

        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const getAllAccounts = async (req, res) => {
    try {
        await Db.db.any('select * from account')
            .then(data => {
                res.status(HttpStatusCodes.OK).send(data);
            })
            .catch(error => {
                res.status(HttpStatusCodes.InternalServerError).send({message: error.message});
            })
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const getAccountByAccountId = async (req, res) => {
    try {
        const {account_id} = req.params;
        if (!account_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await Db.db.oneOrNone('SELECT * FROM account WHERE account_id = $1', [account_id])
                .then(data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
                    } else {
                        res.status(HttpStatusCodes.OK).send(data);
                    }
                })
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const deleteByAccountId = async (req, res) => {
    try {
        const {account_id} = req.params;
        if (!account_id) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await Db.db.oneOrNone('SELECT * FROM account WHERE account_id = $1', [account_id])
                .then(async data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
                    } else {
                        await Db.db.result('DELETE FROM account WHERE account_id = $1', [account_id], r => r.rowCount)
                            .then(rows => {
                                res.status(HttpStatusCodes.OK).send({
                                    message: "Account deleted successfully.",
                                    rows: rows
                                });
                            });
                    }
                })
        }


    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const updateAccount = async (req, res) => {
    try {
        const {account_id} = req.params;
        const {uid, username} = req.body;
        if (!uid || !username) {
            res.status(HttpStatusCodes.NotFound).send({message: "Invalid payload"});
        } else {
            await Db.db.oneOrNone('SELECT * FROM account WHERE account_id = $1', [account_id])
                .then(async data => {
                    if (!data) {
                        res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
                    } else {
                        await Db.db.none('UPDATE account SET uid = $1, username = $2 WHERE account_id = $3', [uid, username, account_id])

                        res.status(HttpStatusCodes.OK).send({message: "Account updated successfully."});
                    }
                });
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}