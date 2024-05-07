import jwt from "jsonwebtoken";
import {HttpStatusCodes} from '../utils/index.js'
import * as https from "node:https";

export const validateGoogleToken = (req, res, next) => {
    // Extract token from the request (assuming it's in the Authorization header)
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    // Fetch Google's public keys
    https.get('https://www.googleapis.com/oauth2/v3/certs', (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            // Parse the response JSON
            const keys = JSON.parse(data);
            // Decode the token
            const decodedToken = jwt.decode(token, {complete: true});
            // Verify the signature using Google's public keys
            const {header, payload, signature} = decodedToken;
            const key = keys[header.kid];
            const verified = crypto.createVerify('RSA-SHA256').update(`${header}.${payload}`).verify(key, signature, 'base64');
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
        });
    }).on('error', (error) => {
        // Error fetching Google's public keys
        res.status(500).json({error: 'Failed to fetch Google public keys'});
    });
};