import { logout } from "./auth.js";
import { PATH_CHANGE_EVENT_NAME, Routes } from "./config.js";
import { changeRoute } from "./router.js";

addEventListener(PATH_CHANGE_EVENT_NAME, handlePathChange);

document.getElementById('CreatePost').addEventListener('click', function(event) {
    event.preventDefault();
    changeRoute(Routes.NewPost, false);
})

document.getElementById('GoHome').addEventListener('click', function(event) {
    event.preventDefault();
    changeRoute(Routes.Homepage, false);
})

document.getElementById('LogOut').addEventListener('click', function() {
    logout();
    changeRoute(Routes.Login, false);
})

function handlePathChange() {
    if (window.location.pathname.substring(1) !== Routes.Login) {
        document.getElementById('navbar').classList.remove('hide')
    } else {
        document.getElementById('navbar').classList.add('hide')
    }
}