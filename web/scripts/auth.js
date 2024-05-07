import { changeRoute } from "./router.js";
import { AUTH_TOKEN_NAME, Routes } from "./config.js";

// =================== Functions ===================

function isLoggedIn() {
    return localStorage.getItem(AUTH_TOKEN_NAME) !== null;
}

function initAuth() {
    localStorage.clear();
    changeRoute(Routes.Login, true);
}

function login(authProviderResponse) {
    localStorage.setItem(AUTH_TOKEN_NAME, authProviderResponse.sub);
    changeRoute(Routes.ORIGIN);
}

export { isLoggedIn, initAuth, login };