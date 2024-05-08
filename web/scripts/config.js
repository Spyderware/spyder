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
 * The name of the website application
 */
const APP_NAME = 'Spyder';

/**
 * The name of the localStorage item for Auth Token
 */
const AUTH_TOKEN_NAME = 'jwt';

export { Routes, PATH_CHANGE_EVENT_NAME, HTML_DIR, APP_NAME, AUTH_TOKEN_NAME, PLACEHOLDER_ROUTE }