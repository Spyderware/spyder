import jwt from "jsonwebtoken";
import {HttpStatusCodes} from '../utils'

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            res.status(HttpStatusCodes.Unauthorized).send("Access Denied");
        }
        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trimStart();
        }
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(HttpStatusCodes.InternalServerError).json({error: err.message});
    }
};