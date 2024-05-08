import { login } from "./auth.js";
import { Routes } from "./config.js";
import { changeRoute } from "./router.js";

// ===================== Init ======================

/**
 * This adds a reference to the window so that it knows about the exported
 * `handleCredentialResponse` function for the Google Auth button. It in
 * essence adds the reference to the DOM's global space.
 * @see login.html
 */
window.handleCredentialResponse = handleCredentialResponse;
document.getElementById('UsernameForm').addEventListener('submit', signupHandler);

// =================== Functions ===================

function handleCredentialResponse(response) {
    // response.credential is the JWT
    const responsePayload = response.credential;
    var loginSuccessful = login(responsePayload);

    if (!loginSuccessful) {
        document.getElementById('LoginButton').classList.add('hide')
        document.getElementById('UsernameForm').classList.remove('hide');
    } else {
        changeRoute(Routes.ORIGIN, false);
    }
}

function signupHandler(event) {
    event.preventDefault();
    changeRoute(Routes.ORIGIN, false);
}