import jwt from "jsonwebtoken";
import { HttpStatusCodes } from '../utils/index.js'

const GOOGLE_CERTS_PEM_URL = 'https://www.googleapis.com/oauth2/v1/certs';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

/**
 * Gets the Google cert keys in a PEM format.
 * @param {string} gApiUrl - the URL endpoint.
 * @returns the Google cert PEM keys.
 */
async function getGoogleKeys(gApiUrl) {
    try {
        const response = await fetch(gApiUrl);
        const keys = await response.text();
        return JSON.parse(keys);
    } catch (error) {
        throw Error(`Error fetching Google keys: ${error}.`);
    }
}

/**
 * This function verifies a user based on their JWT and Google's certs.
 * @param {string} token - the JWT provided by the requestor.
 * @param {string} clientId - the Google OAuth client ID.
 * @returns the verification status with either the payload or an error message.
 */
async function verifyGoogleToken(token, clientId) {
    const gKeys = await getGoogleKeys(GOOGLE_CERTS_PEM_URL);

    const decodedJWT = jwt.decode(token, {
        complete: true,
        json: true,
    });

    const kId = decodedJWT.header.kid;
    const key = gKeys[kId];

    try {
        const output = jwt.verify(token, key, {
            audience: clientId,
            algorithms: ['RS256'],
        });
        return {
            verified: true,
            payload: output,
        }
    } catch (error) {
        return {
            verified: false,
            error: error.message,
        }
    }
}

export async function verifyUser(req, res, next) {
    // Extract token from the request (assuming it's in the Authorization header)
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token

    const verificationResponse = await verifyGoogleToken(token, GOOGLE_CLIENT_ID);

    if (verificationResponse.verified) {
        // Token signature is valid, further validate token claims if needed
        // Check expiration, audience, issuer, etc.
        if (payload.aud === GOOGLE_CLIENT_ID && payload.iss === 'https://accounts.google.com') {
            // Token is valid, proceed to the next middleware
            next();
        } else {
            res.status(401).json({ error: 'Invalid token audience or issuer' });
        }
    } else {
        // Token signature verification failed
        res.status(401).json({ error: verificationResponse.error });
    }
};