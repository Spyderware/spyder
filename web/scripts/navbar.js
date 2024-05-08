import { logout } from "./auth.js";
import { PATH_CHANGE_EVENT_NAME, Routes } from "./config.js";
import { changeRoute } from "./router.js";

addEventListener(PATH_CHANGE_EVENT_NAME, handlePathChange);

document.getElementById('NavbarLogo').addEventListener('click', function(event) {
    event.preventDefault();
    changeRoute(Routes.ORIGIN, false);
});

document.getElementById('CreatePost').addEventListener('click', function(event) {
    event.preventDefault();
    changeRoute(Routes.NewPost, false);
});

// document.getElementById('GoHome').addEventListener('click', function(event) {
//     event.preventDefault();
//     changeRoute(Routes.Homepage, false);
// })

document.getElementById('Search').addEventListener('click', function() {
    var searchVal = document.getElementById('SearchInput').value;
    var categoryVal = document.getElementById('Categories').value;
    changeRoute(`${Routes.Homepage}?search=${searchVal}&category=${categoryVal}`, false);
});

document.getElementById('LogOut').addEventListener('click', function() {
    logout();
    changeRoute(Routes.Login, false);
});

const params = new URLSearchParams(window.location.search);

document.getElementById('SearchInput').value = params.get('search');
const selectElement = document.getElementById('Categories');
const optionToSelect = selectElement.querySelector(`option[value="${params.get('category')}"]`);
optionToSelect.selected = true;

function handlePathChange() {
    var path = window.location.pathname;
    if (path !== Routes.Login) {
        document.getElementById('navbar').classList.remove('hide')
    } else {
        document.getElementById('navbar').classList.add('hide')
    }
}