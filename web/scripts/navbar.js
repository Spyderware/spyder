import { logout } from "./auth.js";
import { populateCategoryDropdown } from "./category-loader.js";
import { LOGGEDIN_EVENT_NAME, PATH_CHANGE_EVENT_NAME, Routes, SEARCH_EVENT_NAME, setSearchPath } from "./config.js";
import { changeRoute } from "./router.js";

// ===================== Init ======================

const NAVBAR_SELECT_ID = 'Categories';

addEventListener(PATH_CHANGE_EVENT_NAME, handlePathChange);
addEventListener(LOGGEDIN_EVENT_NAME, loginInit);
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

    if (window.location.pathname === Routes.Homepage) {
        search();
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
    const searchVal = document.getElementById('SearchInput').value;
    const categoryVal = document.getElementById('Categories').value;

    if (searchVal !== "" && categoryVal !== "") {
        setSearchPath("");
        return;
    }

    changeRoute(`${Routes.Homepage}?search=${searchVal}&category=${categoryVal}`, false);
    if (categoryVal === "") {
        setSearchPath(`?title=${searchVal}`);
    } else {
        setSearchPath(`?title=${searchVal}&category=${categoryVal}`);
    }

    window.dispatchEvent(new Event(SEARCH_EVENT_NAME));
}

async function loginInit() {
    await populateCategoryDropdown(NAVBAR_SELECT_ID);
}