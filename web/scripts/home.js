import { getData } from "./api.js";
import { retrieveJWT } from "./auth.js";
import { populateCategoryDropdown } from "./category-loader.js";
import { changeRoute } from "./router.js";
import { createPostFromTemplate } from "./template-loader.js";

// =================== Init ===================
addEventListener('home-init', initPage);
initPage();

// =================== Constants ===================
const HOMEPAGE_MAIN_VIEW_ID = 'homepage-main-view';
const HOMEPAGE_NO_POSTS_ID = 'home-no-posts';
const NAVBAR_SELECT_ID = 'Categories';

// =================== Functions ===================

async function initPage() {
    const jwt = retrieveJWT();
    const response = await getData('post', jwt);
    let posts = [];
    try {
        posts = await response.json();
    } catch (error) {
        console.error('Could not fetch posts.');
    }

    if (posts.length > 0) {
        populatePostsList(posts);
    } else {
        document.getElementById(HOMEPAGE_NO_POSTS_ID).style.display = 'flex';
    }

    await populateCategoryDropdown(NAVBAR_SELECT_ID);
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

            document.getElementById(`post-${post.post_id}`).addEventListener('click', function (event) {
                event.preventDefault();
                changeRoute(event.currentTarget.getAttribute('href'), false);
            });
        }
    }
}