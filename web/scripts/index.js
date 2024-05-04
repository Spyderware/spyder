import { Routes } from "./utils.js";
import { changeRoute } from "./router.js";

window.addEventListener('DOMContentLoaded', loadLogin);

/**
 * Load the login page when the user first accesses the site.
 */
function loadLogin() {
    changeRoute(Routes.Login, false);
}