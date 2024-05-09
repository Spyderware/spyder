import { getData } from "./api.js";
import { retrieveJWT } from "./auth.js";
import { SEARCH_EVENT_NAME, getSearchPath } from "./config.js";
import { changeRoute } from "./router.js";
import { createPostFromTemplate } from "./template-loader.js";

// =================== Init ===================

addEventListener(SEARCH_EVENT_NAME, initPage);
initPage();

// =================== Constants ===================

const HOMEPAGE_MAIN_VIEW_ID = 'homepage-main-view';
const HOMEPAGE_NO_POSTS_ID = 'home-no-posts';

// =================== Functions ===================

async function initPage() {
    const jwt = retrieveJWT();
    const response = await getData(`post${getSearchPath()}`, jwt);

    let posts = [];
    try {
        posts = await response.json();
    } catch (error) {
        console.error('Could not fetch posts.');
    }

    setTimeout(function() {
        if (posts.length > 0) {
            populatePostsList(posts);
            document.getElementById(HOMEPAGE_NO_POSTS_ID).style.display = 'none';
        } else {
            document.getElementById(HOMEPAGE_NO_POSTS_ID).style.display = 'flex';
        }
    }, 250)
}

/**
 * This function takes a list of post data objects, and dynamically creates the post `cards`
 * that get added to the homepage.
 * @param {{
 * post_id,
* username,
* title,
* body,
* umg_url,
* }[]} posts - a list of posts with their data.
 */
async function populatePostsList(posts) {
    const postContainer = document.getElementById(HOMEPAGE_MAIN_VIEW_ID);

    if (posts.length == 0) {
        postContainer.innerHTML = 'No Posts Found';
    } else {
        for (const post of posts) {
            const postHtmlElement = await createPostFromTemplate(post);
            postContainer.insertAdjacentHTML('beforeend', postHtmlElement);

            document.getElementById(`post-${post.post_id}`).addEventListener('click', handlePostClick);
        }
    }
}

function handlePostClick(event) {
    event.preventDefault();
    changeRoute(event.currentTarget.getAttribute('href'), false);
}