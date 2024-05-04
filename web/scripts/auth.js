import { changeRoute } from "./router.js";
import { Routes } from "./utils.js";

// =================== Functions ===================

function isLoggedIn() {
    return false;
}

function initAuth() {
    localStorage.clear();
    changeRoute(Routes.Login, true);
}

export { isLoggedIn, initAuth };