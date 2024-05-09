import { Routes, PATH_CHANGE_EVENT_NAME } from "./config.js";
import { changeRoute } from "./router.js";
import { initAuth, isLoggedIn } from "./auth.js";

// ===================== Init ======================

window.addEventListener('DOMContentLoaded', init);
window.addEventListener('popstate', init);

// =================== Functions ===================

async function init() {
    var loggedIn = await isLoggedIn();
    if (!loggedIn) {
        initAuth();
    } else if (window.location.pathname === "/") {
        initRootPathPage();
    } else {
        routeToPage();
    }
}

function initRootPathPage() {
    changeRoute(Routes.Homepage, true);
}

function routeToPage() {
    window.dispatchEvent(new Event(PATH_CHANGE_EVENT_NAME));
}