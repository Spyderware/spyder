import { createPostFromTemplate, createCommentFromTemplate } from "./template-loader.js";


// =================== Constants ===================
const POST_VIEW_CONTAINER_ID = 'post-view-container';
const COMMENT_CONTAINER_ID = 'comment-container';

// =================== Functions ===================

async function preparePostView() {
    const text = window.location.pathname;
    const match = text.match(/\/post\/(\d+)/);

    if (!match) {
        throw new Error('Failed to read postId from the path.');
    }

    const postId = match[1];

    // TODO : get post data for postId
    // TODO : get comment data for postId

    const postData = {
        postId: postId,
        username: 'testUsername1',
        title: `Post ${postId} Title`,
        body: `Body of post ${postId}`
    }

    const comments = [
        {
            commentId: 2,
            username: 'testUsername2',
            body: `Comment #2 on post ${postId}`
        },
        {
            commentId: 1,
            username: 'testUsername1',
            body: `Comment #1 on post ${postId}`
        }
    ];

    loadPostView(postData);
    populateCommentsList(comments);
}

/**
 * Loads the specific post into the post page, above the comment section.
 * @param {{
* postId,
* username,
* title,
* body
* }} postData - the data / content for the specific post.
 */
async function loadPostView(postData) {
    const postViewContainer = document.getElementById(POST_VIEW_CONTAINER_ID);
    const postElement = await createPostFromTemplate(postData);
    postViewContainer.insertAdjacentHTML('beforeend', postElement);
}

/**
 * This function takes a list of comment data objects, and dynamically creates the comment `cards`
 * that get added to the post page for that post.
 * @param {{
* commentId,
* username,
* body
* }[]} comments - a list of comments with their data.
 */
async function populateCommentsList(comments) {
    const commentContainer = document.getElementById(COMMENT_CONTAINER_ID);

    if (comments.length == 0) {
        commentContainer.innerHTML = 'No comments Found';
    } else {
        for (const comment of comments) {
            const commentHtmlElement = await createCommentFromTemplate(comment);
            commentContainer.insertAdjacentHTML('beforeend', commentHtmlElement);
        }
    }
}

// TODO : get post data
// TODO : get comments for post
preparePostView();