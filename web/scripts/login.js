import { login } from "./auth.js";

// ===================== Init ======================

/**
 * This adds a reference to the window so that it knows about the exported
 * `handleCredentialResponse` function for the Google Auth button. It in
 * essence adds the reference to the DOM's global space.
 * @see login.html
 */
window.handleCredentialResponse = handleCredentialResponse;

// =================== Functions ===================

function handleCredentialResponse(response) {
    // response.credential is the JWT
    const responsePayload = response.credential;
    login(responsePayload);
}

export { handleCredentialResponse }