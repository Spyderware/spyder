import { Routes } from "./utils.js";
import { changeRoute } from "./router.js";

// =================== Functions ===================

document.getElementById('hpgBtn1').addEventListener('click', function () {
    changeRoute(Routes.Login, false);
});