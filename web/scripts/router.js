import { HTML_PREFIX } from "./utils.js";

// =================== Constants ===================

/**
 * The ID for the main container in `index.html` where content will
 * be loaded into.
 */
const CONTENT_CONTAINER_ID = 'content-container';

// =================== Init ===================

/**
 * Called when the page is first loaded, this function performs various initialization tasks such as adding event listeners.
 */
function init() {
    window.addEventListener('popstate', handlePathChange);
    window.addEventListener('loadNewContent', handlePathChange);
}

window.addEventListener('DOMContentLoaded', init);

/**
 * Array to hold all the elements hoisted from loaded documents to
 * remove them when the page unloads.
 */
const hoistedElements = [];

// =================== Functions ===================

/**
 * The handler for when a route changes. A route changes when either when
 * manually edited with `pushState` or when the `popState` event is fired.
 */
async function handlePathChange() {
    const newPath = window.location.pathname.substring(1);
    await loadHtmlContent(newPath);
}

/**
 * This function attempts to load html from the network and
 * parse its body as text.
 * @param {string} path - the path on which to fetch the html content.
 * @returns the html content.
 */
async function fetchAndParse(path) {
    const response = await fetch(`${path}.html`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}.html`);
    }
    return await response.text();
}

/**
 * This function takes the embedded scripts from the loaded html
 * and adds them to the `head` of the main html document. This is required
 * for the scripts to execute and run normally once loaded.
 * @param {HTMLElement} container - the container with the loaded scripts.
 */
function hoistScripts(container) {
    const scriptTags = container.querySelectorAll('script');
    scriptTags.forEach(scriptTag => {
        const src = scriptTag.getAttribute('src');
        if (src) {
            const scriptElement = document.createElement('script');
            scriptElement.src = src;
            if (scriptTag.getAttribute('type') === 'module') {
                scriptElement.type = 'module';
            }
            if (scriptTag.defer) {
                scriptElement.defer = true;
            }
            document.head.appendChild(scriptElement);

            hoistedElements.push(scriptElement);
            scriptTag.parentNode.removeChild(scriptTag);
        } else {
            eval(scriptTag.textContent);
        }
    });
}

/**
 * This function takes the embedded CSS stylesheets from the loaded html
 * and adds them to the `head` of the main html document. This is allows for page specific styling.
 * @param {HTMLElement} container - the container with the loaded scripts.
 */
function hoistCss(container) {
    const linkTags = container.querySelectorAll('link');
    linkTags.forEach(linkTag => {
        if (linkTag.getAttribute('rel') === 'stylesheet') {
            const cssElement = document.createElement('link');
            cssElement.rel = 'stylesheet';
            cssElement.href = linkTag.getAttribute('href');
            document.head.appendChild(cssElement);

            hoistedElements.push(cssElement);
            linkTag.parentNode.removeChild(linkTag);
        }
    });
}

/**
 * This function takes the elements that were hoisted from the loaded html
 * and removes them in preparation to load a new page / new content.
 * @param {HTMLElement[]} elements - the elements that were added to the head
 * for a specific page.
 */
function removeHoistedElements(elements) {
    while (elements.length > 0) {
        const element = elements.pop();
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
}

/**
 * This function fetches and prepares the html content to be loaded into the
 * main document.
 * @param {string} page - the name of the content page to load.
 */
async function loadHtmlContent(page) {
    const contentContainer = document.getElementById(CONTENT_CONTAINER_ID);

    try {
        // redirect to the index.html
        // TODO : find a better solution that doesn't cause a infi loopy
        if (page === 'index.html' || page === '') {
            window.location.pathname = '';
        } else {
            const htmlText = await fetchAndParse(`${HTML_PREFIX}${page}`);
            contentContainer.innerHTML = htmlText;

            removeHoistedElements(hoistedElements);

            hoistScripts(contentContainer);
            hoistCss(contentContainer);
        }
    } catch (error) {
        console.error('Error loading HTML content:', error);
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
    if (replaceState) {
        window.history.replaceState({}, '', page);
    } else {
        window.history.pushState({}, '', page);
    }

    const newContentEvent = new Event('loadNewContent');
    window.dispatchEvent(newContentEvent);
}

export { changeRoute }