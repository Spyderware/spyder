/**
 * An enum listing the configured routes that can be used to load content.
 */
const Routes = Object.freeze({
    Login: 'login',
    Homepage: 'home',
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
 * The name of the website application
 */
const LANDING_PATH = Routes.Homepage;

export { Routes, PATH_CHANGE_EVENT_NAME, HTML_DIR, APP_NAME, LANDING_PATH }