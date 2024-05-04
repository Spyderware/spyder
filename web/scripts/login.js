import { Routes } from "./utils.js";
import { changeRoute } from "./router.js";

/**
 * This adds a reference to the window so that it knows about the exported
 * `handleCredentialResponse` function for the Google Auth button. It in
 * essence adds the reference to the DOM's global space.
 * @see login.html
 */
window.handleCredentialResponse = handleCredentialResponse;

function handleCredentialResponse(response) {
    // response.credential is the JWT
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    // make request to server
    // wait for response
    // if authenticated then load homepage
    console.log('Bypassing auth -- remove in prod');
    changeRoute(Routes.Homepage, true);
}

function decodeJwtResponse(token) {
    try {
        let decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded;
    } catch (e) {
        return null;
    }
}

export { handleCredentialResponse }