import { changeRoute } from "./router.js";
import { AUTH_TOKEN_NAME, Routes, USERNAME_TOKEN_NAME, USER_LOGO_TOKEN_NAME } from "./config.js";
import { getData } from "./api.js";

// =================== Functions ===================

function isLoggedIn() {
    var jwt = retrieveJWT();
    if (jwt) {
        return login(jwt);
    } else {
        return false;
    }
}

function initAuth() {
    localStorage.clear();
    changeRoute(Routes.Login, true);
}

function login(authProviderResponse) {
    localStorage.setItem(AUTH_TOKEN_NAME, authProviderResponse);

    var {username, userLogo} = getUserDetails(authProviderResponse);

    if (username) {
        localStorage.setItem(USERNAME_TOKEN_NAME, username);
        localStorage.setItem(USER_LOGO_TOKEN_NAME, userLogo);
        return true;
    } else {
        return false;
    }
}

async function getUserDetails(jwt) {
    console.log(jwt);
    var userDetail = decodeJWT(jwt);
    console.log(userDetail)

    if (!userDetail.sub) {
        return { username: null, userLogo: null }
    }

    var loginData = await getData('/login', { uid: userDetail.sub }, jwt);
    return loginData.json();
}

function logout() {
    localStorage.clear();
    changeRoute(Routes.Login, false);
}

function retrieveUsername() {
    return localStorage.getItem(USERNAME_TOKEN_NAME);
}

function retrieveUserLogo() {
    return localStorage.getItem(USER_LOGO_TOKEN_NAME);
}

function retrieveJWT() {
    return localStorage.getItem(AUTH_TOKEN_NAME);
}

function decodeJWT(jwt) {
    try {
        let decoded = JSON.parse(atob(jwt.split('.')[1]));
        return decoded;
    } catch (e) {
        return null;
    }
}

function signup() {
    changeRoute(Routes.ORIGIN, false);
}

export { isLoggedIn, initAuth, login, logout, retrieveUsername, retrieveUserLogo, retrieveJWT, signup, decodeJWT };