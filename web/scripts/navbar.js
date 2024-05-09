import { logout } from "./auth.js";
import { PATH_CHANGE_EVENT_NAME, Routes, SEARCH_EVENT_NAME } from "./config.js";
import { changeRoute } from "./router.js";

// ===================== Init ======================

var searchVal = "";
var categoryVal = "";

addEventListener(PATH_CHANGE_EVENT_NAME, handlePathChange);
addEventListener('DOMContentLoaded', initNavbar);

document.getElementById('NavbarLogo').addEventListener('click', homeHandler);
document.getElementById('CreatePost').addEventListener('click', createPost);
document.getElementById('Search').addEventListener('click', search);
document.getElementById('CreatePostMobile').addEventListener('click', createPost);

document.getElementById('LogOut').addEventListener('click', logoutHandler);

// =================== Functions ===================

function handlePathChange() {
    var path = window.location.pathname;
    if (path !== Routes.Login) {
        document.getElementById('navbar').classList.remove('hide')
        document.getElementById('CreatePostMobile').classList.remove('hide');
    } else {
        document.getElementById('navbar').classList.add('hide')
        document.getElementById('CreatePostMobile').classList.add('hide');
    }
}

function initNavbar() {
    const params = new URLSearchParams(window.location.search);

    document.getElementById('SearchInput').value = params.get('search');
    const selectElement = document.getElementById('Categories');

    const category = params.get('category');
    
    if (category) {
        const optionToSelect = selectElement.querySelector(`option[value="${category}"]`);
        optionToSelect.selected = true;
    }
}

function logoutHandler() {
    logout();
}

function homeHandler(event) {
    event.preventDefault();
    changeRoute(Routes.ORIGIN, false);
}

function createPost(event) {
    event.preventDefault();
    changeRoute(Routes.NewPost, false);
}

function search() {
    const newSearchVal = document.getElementById('SearchInput').value;
    const newCategoryVal = document.getElementById('Categories').value;

    if (newCategoryVal === categoryVal && newSearchVal === searchVal) {
        return;
    } else {
        searchVal = newSearchVal;
        categoryVal = newCategoryVal;
    }

    changeRoute(`${Routes.Homepage}?search=${searchVal}&category=${categoryVal}`, false);

    var searchEvent = new Event(SEARCH_EVENT_NAME);
    searchEvent.payload = { search: searchVal, category: categoryVal};
    window.dispatchEvent(searchEvent);
}