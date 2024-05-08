import jwt from "jsonwebtoken";
import {HttpStatusCodes} from '../utils/index.js'
import crypto from 'crypto';
import {OAuth2Client} from 'google-auth-library';

export const validateGoogleToken = (req, res, next) => {
    // Extract token from the request (assuming it's in the Authorization header)
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    // Fetch Google's public keys
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("https://www.googleapis.com/oauth2/v3/certs", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            const keys = JSON.parse(result).keys;
            // Decode the token
            const decodedToken = jwt.decode(token, {complete: true});
            // Verify the signature using Google's public keys
            const {header, payload, signature} = decodedToken;
            const key = keys.find((key) => key.kid === header.kid);
            // const verified= jwt.verify(token, key)
            const test = {key: key}
            const verified = crypto.createVerify('RSA-SHA256').update(`${header}.${payload}`).verify(test, signature, 'base64');
            if (verified) {
                // Token signature is valid, further validate token claims if needed
                // Check expiration, audience, issuer, etc.
                if (payload.aud === GOOGLE_CLIENT_ID && payload.iss === 'https://accounts.google.com') {
                    // Token is valid, proceed to the next middleware
                    next();
                } else {
                    res.status(401).json({error: 'Invalid token audience or issuer'});
                }
            } else {
                // Token signature verification failed
                res.status(401).json({error: 'Invalid token signature'});
            }
        })
        .catch((error) => console.error(error));
};

const client = new OAuth2Client();
export const validateGoogleToken2 = async (req, res, next) => {
    try{
        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const JWTToken = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
        const ticket = await client.verifyIdToken({
            idToken: JWTToken,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        next();
    }catch (e){
        res.status(401).json({error: 'Invalid token'});
    }
}