import {HttpStatusCodes, DbUtils} from '../utils/index.js';

export const createAccount = async (req, res) => {
    try {
        const {uid, username} = req.body;
        if (!uid || !username) {
            res.status(HttpStatusCodes.BadRequest).send({message: "Invalid payload"});
        } else {
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM account WHERE uid = $1 OR username = $2', [uid, username])
                .then(async data => {
                    if (data) {
                        res.status(HttpStatusCodes.Conflict).send({message: "Account already exists"});
                    } else {
                        await DbUtils.spyderdb.none('INSERT INTO account(uid, username) VALUES(${uid}, ${username})', {
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
        await DbUtils.spyderdb.any('select * from account')
            .then(data => {
                res.status(HttpStatusCodes.OK).send(data);
            });
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
            await DbUtils.spyderdb.oneOrNone('SELECT * FROM account WHERE account_id = $1', [account_id])
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
            const accountExists = await checkIfAccountExists(account_id);
            if (!accountExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
            } else {
                await DbUtils.spyderdb.result('DELETE FROM account WHERE account_id = $1', [account_id], r => r.rowCount)
                    .then(rows => {
                        res.status(HttpStatusCodes.OK).send({
                            message: "Account deleted successfully."
                        });
                    });
            }
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
            const accountExists = await checkIfAccountExists(account_id);
            if (!accountExists) {
                res.status(HttpStatusCodes.NotFound).send({message: "Account does not exist"});
            } else {
                await DbUtils.spyderdb.none('UPDATE account SET uid = $1, username = $2 WHERE account_id = $3', [uid, username, account_id])

                res.status(HttpStatusCodes.OK).send({message: "Account updated successfully."});
            }
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}

export const checkIfAccountExists = (account_id) => {
    return DbUtils.spyderdb.oneOrNone('SELECT EXISTS(SELECT 1 FROM account WHERE account_id = $1)', [account_id])
        .then(data => {
            return data.exists;
        })
        .catch(error => {
            throw error;
        });
}

export const checkIfUIDExists = async (uid) => {
    let username = null;
    await DbUtils.spyderdb.oneOrNone('SELECT * FROM account WHERE uid = $1', [uid])
        .then(async data => {
            if (data) {
                username = data.username;
            } else {
                await addUser(uid, null);
            }
        })
    return username;
}

export const addUser = async (uid, username) => {
    await DbUtils.spyderdb.none('INSERT INTO account(uid, username) VALUES(${uid}, ${username})', {
        uid: uid,
        username: username
    });
}

