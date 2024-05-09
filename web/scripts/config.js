/**
 * Placeholder for dynamic routing values
 */
const PLACEHOLDER_ROUTE = '{val}';

/**
 * An enum listing the configured routes that can be used to load content.
 */
const Routes = Object.freeze({
    ORIGIN: '/home',
    Login: '/login',
    Homepage: '/home',
    Post: `/post/${PLACEHOLDER_ROUTE}`,
    NewPost: '/newpost',
});

/**
 * The directory prefix for where the html files are stored - excluding
 * `index.html`.
 */
const HTML_DIR = 'html/';

/**
 * The name of the router invocation event
 */
const PATH_CHANGE_EVENT_NAME = 'pathchanged';

/**
 * The name of the search invocation event
 */
const SEARCH_EVENT_NAME = 'searched';

/**
 * The name of the successful login invocation event
 */
const LOGGEDIN_EVENT_NAME = 'loggedin';

/**
 * The name of the website application
 */
const APP_NAME = 'Spyder';

/**
 * The name of the localStorage item for Auth Token
 */
const AUTH_TOKEN_NAME = 'jwt';

/**
 * The name of the localStorage item for Auth Token
 */
const USERNAME_TOKEN_NAME = 'username';

/**
 * The name of the localStorage item for Auth Token
 */
const USER_LOGO_TOKEN_NAME = 'user-logo';

/**
 * The name of the API Base Url
 */
const BASE_API_URL = 'http://localhost:8080/api/v1';

/**
 * The search path for posts
 */
var SEARCH_PATH = "";

function setSearchPath(val) {
    SEARCH_PATH = val;
}

function getSearchPath() {
    return SEARCH_PATH;
}

export { Routes, PATH_CHANGE_EVENT_NAME, HTML_DIR, APP_NAME, AUTH_TOKEN_NAME, PLACEHOLDER_ROUTE, SEARCH_EVENT_NAME, USERNAME_TOKEN_NAME, USER_LOGO_TOKEN_NAME, BASE_API_URL, setSearchPath, getSearchPath, LOGGEDIN_EVENT_NAME }