import { ContentTemplates, Routes } from "./utils.js";
import { changeRoute } from "./router.js";
import { fetchContent } from "./page-loader.js";

// =================== Constants ===================
const HOMEPAGE_MAIN_VIEW_ID = 'homepage-main-view';

// =================== Functions ===================

/**
 * This function loads a generic `post` template and injects the post data into its respective field.
 * @param {{
 * postId,
 * username,
 * title,
 * body
 * }} postData - the data / content for a specific post.
 * @returns a post template populated with the provided data.
 */
async function createPostFromTemplate(postData) {
    if (!('postId' in postData && 'username' in postData && 'title' in postData && 'body' in postData)) {
        throw new Error("postData must contain 'postId', 'username', 'title', and 'body' fields.");
    }

    let postTemplate = await fetchContent(ContentTemplates.PostTemplate);

    postTemplate = postTemplate.replace(/##POST_ID##/g, postData.postId)
        .replace(/##POST_USERNAME##/g, postData.username)
        .replace(/##POST_TITLE##/g, postData.title)
        .replace(/##POST_BODY##/g, postData.body);

    return postTemplate;
}

/**
 * This function takes a list of post data objects, and dynamically creates the post `cards`
 * that get added to the homepage.
 * @param {{
 * postId,
* username,
* title,
* body
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

            document.getElementById(`post-${post.postId}`).addEventListener('click', function (event) {
                event.preventDefault();
                changeRoute(event.currentTarget.getAttribute('href'), false);
            });
        }
    }
}

// ------------------------------- TESTING CODE -------------------------------
const testPosts = [
    {
        postId: 1,
        username: 'Trucks<3',
        title: 'Post 1 Baby!',
        body: "Smelling cheese is the first sign of major success."
    },
    {
        postId: 2,
        username: 'RandyFlacks29',
        title: 'Post 2 Amazing Title',
        body: "Wow this exploit blew up Cpt. Jack Sparrow's back vault."
    },
    {
        postId: 3,
        username: 'Po7en7',
        title: 'Post 3: Rise of the Cupcakes',
        body: "In a quaint village nestled between rolling hills and winding rivers, life unfolded like pages in a storybook. Narrow cobblestone streets wound their way through the town, lined with colorful cottages adorned with flower boxes bursting with blooms. The scent of freshly baked bread wafted from the local bakery, mingling with the earthy aroma of the nearby forest. Villagers bustled about their daily routines, exchanging smiles and friendly greetings as they went about their tasks. At the heart of the village stood an ancient oak tree, its gnarled branches stretching towards the sky like outstretched arms, offering shade and shelter to those who sought respite beneath its boughs. As the sun dipped low on the horizon, painting the sky in hues of orange and pink, the village settled into a peaceful rhythm, a timeless haven untouched by the chaos of the outside world."
    },
    {
        postId: 4,
        username: 'WoNiLi',
        title: 'Post 4 - Wall Hacks',
        body: "Pineapples everywhere!"
    }
];
populatePostsList(testPosts);

// ------------------------------- END TESTING CODE -------------------------------

/**
 * When home page loads:
 *  - get a 'page' of posts -- paginate
 */