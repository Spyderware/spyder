import { login, signup } from "./auth.js";
import { Routes, SEARCH_EVENT_NAME } from "./config.js";
import { changeRoute } from "./router.js";

// ===================== Init ======================

/**
 * This adds a reference to the window so that it knows about the exported
 * `handleCredentialResponse` function for the Google Auth button. It in
 * essence adds the reference to the DOM's global space.
 * @see login.html
 */
window.handleCredentialResponse = handleCredentialResponse;
addEventListener('login-init', initPage);
initPage();

// =================== Functions ===================

function initPage() {
    document.getElementById('UsernameForm').addEventListener('submit', signupHandler);

    var googleScript = document.createElement('script');
    googleScript.src =  "https://accounts.google.com/gsi/client";
    googleScript.defer = true;

    document.head.appendChild(googleScript);
}

async function handleCredentialResponse(response) {
    // response.credential is the JWT
    const responsePayload = response.credential;
    var loginSuccessful = await login(responsePayload);

    if (!loginSuccessful) {
        document.getElementById('LoginButton').classList.add('hide')
        document.getElementById('UsernameForm').classList.remove('hide');
    } else {
        changeRoute(Routes.ORIGIN, false);
        window.dispatchEvent(new Event(SEARCH_EVENT_NAME));
    }
}

async function signupHandler(event) {
    event.preventDefault();

    const username = document.getElementById('fUsername').value;

    const response = await signup(username);
    if (response) {
        document.getElementById('ErrorMessage').innerText = message;
    }
}