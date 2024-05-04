/**
 * The directory prefix for where the html files are stored - excluding
 * `index.html`.
 */
const HTML_PREFIX = 'html/';

/**
 * An enum listing the configured routes that can be used to load content.
 */
const Routes = Object.freeze({
    Login: 'login',
    Homepage: 'UserNameScreen',
});

export { HTML_PREFIX, Routes }