import { APP_NAME, HTML_DIR } from './utils.js'

// =================== Constants ===================

/**
 * The ID for the main container in `index.html` where content will
 * be loaded into.
 */
const CONTENT_CONTAINER_ID = 'content-container';

// =============== Global Variables ================

/**
 * Array to hold all the elements hoisted from loaded documents to
 * remove them when the page unloads.
 */
var hoistedElements = [];

// =================== Functions ===================

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
    elements.forEach(element => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    });
    elements = []
}

/**
 * This function attempts to load html from the network and
 * parse its body as text.
 * @param {string} path - the path on which to fetch the html content.
 * @returns the html content.
 */
async function fetchContent(path) {
    const response = await fetch(`${path}.html`);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${path}.html`);
    }
    return await response.text();
}

/**
 * This function takes the embedded title from the loaded html
 * and overrides it in the main html document. This is allows for page specific titles.
 * @param {HTMLElement} container - the container with the loaded scripts.
 */
function changePageTitle(container) {
    const titleTags = container.querySelectorAll('title');
    
    var title = APP_NAME;
    if (titleTags.length > 0) {
        title = titleTags[0].innerHTML;
        titleTags[0].parentNode.removeChild(titleTags[0]);
    }
    
    document.title = title;
}

function fixScriptLocations() {
    const currentDomain = window.location.pathname;

    document.head.querySelectorAll('script').forEach(script => {
        console.log("INIT" + script.src);
        script.src = "../".repeat((currentDomain.match(/\//g) || []).length) + script.src;
        console.log("AFTER" + script.src);
    });
}

/**
 * This function fetches and prepares the html content to be loaded into the
 * main document.
 * @param {string} page - the name of the content page to load.
 */
async function loadPage(page) {
    const contentContainer = document.getElementById(CONTENT_CONTAINER_ID);

    try {
        const htmlText = await fetchContent(`${HTML_DIR}${page}`);
        contentContainer.innerHTML = htmlText;

        removeHoistedElements(hoistedElements);

        hoistScripts(contentContainer);
        hoistCss(contentContainer);
        changePageTitle(contentContainer);

        fixScriptLocations();
    } catch (error) {
        console.error('Error loading HTML content:', error);
    }
}

export { loadPage };