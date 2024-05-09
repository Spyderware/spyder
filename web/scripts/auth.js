import { changeRoute } from "./router.js";
import { AUTH_TOKEN_NAME, Routes, USERNAME_TOKEN_NAME, USER_LOGO_TOKEN_NAME } from "./config.js";
import { postData } from "./api.js";

// =================== Functions ===================

async function isLoggedIn() {
    var jwt = retrieveJWT();
    if (jwt) {
        return await checkLogin(jwt);
    } else {
        return false;
    }
}

function initAuth() {
    localStorage.clear();
    changeRoute(Routes.Login, true);
}

async function checkLogin(jwt) {
    var {username, img_url} = await getUserDetails(jwt);

    if (username) {
        localStorage.setItem(USERNAME_TOKEN_NAME, username);
        localStorage.setItem(USER_LOGO_TOKEN_NAME, img_url);
        return true;
    } else {
        return false;
    }
}

async function login(authProviderResponse) {
    localStorage.setItem(AUTH_TOKEN_NAME, authProviderResponse);

    return await checkLogin(authProviderResponse);
}

async function getUserDetails(jwt) {
    var userDetail = decodeJWT(jwt);

    const userNotFoundObj = { username: null, userLogo: null };
    if (!userDetail.sub) {
        return userNotFoundObj;
    }

    var loginData = await postData('auth/login', { uid: userDetail.sub }, jwt);

    if (loginData.status !== 200) {
        return userNotFoundObj;
    }

    return await loginData.json();
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

async function signup(username) {
    var jwt = retrieveJWT();
    if (jwt) {
        const decodedJWT = decodeJWT(jwt);
        console.log(decodedJWT);
        const signupBody = {
            uid: decodedJWT.sub,
            username: username,
            img_url: decodedJWT.picture
        }
        var signupData = await postData('auth/signup', signupBody, jwt);

        if (signupData.ok) {
            localStorage.setItem(USERNAME_TOKEN_NAME, username);
            localStorage.setItem(USER_LOGO_TOKEN_NAME, decodedJWT.picture);
    
            changeRoute(Routes.ORIGIN, false);
        }
    } 
}

export { isLoggedIn, initAuth, login, logout, retrieveUsername, retrieveUserLogo, retrieveJWT, signup, decodeJWT };