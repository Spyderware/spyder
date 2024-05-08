import { loadPage } from "./page-loader.js";
import { PATH_CHANGE_EVENT_NAME, PLACEHOLDER_ROUTE, Routes } from "./config.js";

// ===================== Init ======================

addEventListener(PATH_CHANGE_EVENT_NAME, handlePathChange);

// =================== Functions ===================

/**
 * The handler for when a route changes. A route changes when either when
 * manually edited with `pushState` or when the `popState` event is fired.
 */
async function handlePathChange() {
    var newPath = window.location.pathname.substring(1);
    const subPathBeginIndex = newPath.indexOf('/');

    var pageLoc = newPath;
    if(subPathBeginIndex !== -1) {
        pageLoc = newPath.substring(0, subPathBeginIndex);
        newPath = pageLoc + `/${PLACEHOLDER_ROUTE}`.repeat(newPath.split('/').length - 1);
    }

    if (!isValidPath(`/${newPath}`)) {
        changeRoute(Routes.ORIGIN, true);
    } else {
        await loadPage(pageLoc);
    }
}

/**
 * This is the function called to initiate a page / route change.
 * Specifying `replaceState` to `true` will change the current browser state
 * without adding to its state history. Setting it to `false` will change the
 * state and add it to the window's state history.
 * @param {string} page 
 * @param {boolean} replaceState 
 */
function changeRoute(page, replaceState) {
    if(isCurrentPath(page.substring(1))) {
        return;
    }

    if (replaceState) {
        window.history.replaceState({}, '', page);
    } else {
        window.history.pushState({}, '', page);
    }

    window.dispatchEvent(new Event(PATH_CHANGE_EVENT_NAME));
}

/**
 * This is the function called to check if a path is the current path.
 * @param {string} path 
 */
function isCurrentPath(path) {
    return `${window.location.origin}/${path}` === window.location.href || path === window.location.href
}

/**
 * This is the function called to validate that a path is in the routes defined.
 * @param {string} path 
 */
function isValidPath(path) {
    return Object.values(Routes).includes(path);
}

export { changeRoute }