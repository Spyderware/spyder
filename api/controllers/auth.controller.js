import {HttpStatusCodes} from "../utils/index.js";
import {AccountController} from './index.js'


export const login = async (req, res) => {
    try {
        const {uid} = req.body;
        if (!uid) {
            res.status(HttpStatusCodes.BadRequest).send({message: "Invalid payload"});
        } else {
            const accountObject = await AccountController.checkIfUIDExists(uid);
            res.status(HttpStatusCodes.OK).send(accountObject);
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}


export const signup = async (req, res) => {
    try {
        const {uid, username, img_url} = req.body;
        if (!uid || !username || !img_url) {
            res.status(HttpStatusCodes.BadRequest).send({message: "Invalid payload"});
        } else {
            await AccountController.updateUser(uid, username, img_url);
        }
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).send({message: err.message});
    }
}