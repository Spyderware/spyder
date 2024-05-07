import { Routes } from "./config.js";
import { changeRoute } from "./router.js";

// =================== Functions ===================

document.getElementById('post-1').addEventListener('click', function(event) {
    event.preventDefault();
    changeRoute(event.currentTarget.getAttribute('href'), true);
});