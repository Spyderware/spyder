import {HttpStatusCodes, DbUtils} from '../utils/index.js';

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
    let accountObject = {
        username: null,
        img_url: null,
    };
    await DbUtils.spyderdb.oneOrNone('SELECT * FROM account WHERE uid = $1', [uid])
        .then(async data => {
            if (data) {
                accountObject = {
                    username: data.username,
                    img_url: data.img_url,
                }
            } else {
                await addUser(uid, null, null);
            }
        })
    return accountObject;
}

export const addUser = async (uid, username, img_url) => {
    await DbUtils.spyderdb.none('INSERT INTO account(uid, username, img_url) VALUES(${uid}, ${username}, ${img_url})', {
        uid: uid,
        username: username,
        img_url: img_url
    });
}

export const updateUser = async (uid, username, img_url) => {
    await DbUtils.spyderdb.none('UPDATE account SET username = ${username}, img_url = ${img_url} WHERE uid = ${uid}', {
        uid: uid,
        username: username,
        img_url: img_url
    });
}

export const getAccountID = async (uid) => {
    var account_id = null;
    await DbUtils.spyderdb.oneOrNone('SELECT account_id FROM account WHERE uid = $1', [uid])
        .then(async data => {
            account_id = data.account_id
        })
    return account_id;
}
