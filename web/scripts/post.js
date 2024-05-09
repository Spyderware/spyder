import { getData, postData } from "./api.js";
import { decodeJWT, retrieveJWT, retrieveUserLogo, retrieveUsername } from "./auth.js";
import { createPostFromTemplate, createCommentFromTemplate } from "./template-loader.js";

// =================== Init ===================
let postId;
addEventListener('post-init', initPage);
initPage();

// =================== Constants ===================
const POST_VIEW_CONTAINER_ID = 'post-view-container';
const COMMENT_CONTAINER_ID = 'comment-container';
const NO_COMMENT_ID = 'no-comments-id';
const COMMENT_TEXT_AREA_ID = 'CommentInput';

// =================== Functions ===================
async function initPage() {
    const pathText = window.location.pathname;
    const match = pathText.match(/\/post\/(\d+)/);

    if (!match) {
        throw new Error('Failed to read postId from the path.');
    }

    postId = match[1];
    await preparePostView(postId);

    document.getElementById('submit-comment').addEventListener('click', createComment);
}

async function preparePostView(postId) {
    const jwt = retrieveJWT();
    const postResponse = await getData(`post/${postId}`, jwt);
    const commentsResponse = await getData(`comment/byPostId/${postId}`, jwt);

    let post;
    let comments = [];
    try {
        post = await postResponse.json();
        comments = await commentsResponse.json();
    } catch (error) {
        console.error('Could not fetch post / comments.');
    }

    if (comments.length > 0) {
        populateCommentsList(comments);
    } else {
        document.getElementById(NO_COMMENT_ID).style.display = 'flex';
    }

    loadPostView(post);
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
* post_id,
* username,
* comment,
* img_url
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

async function createComment(event) {
    event.preventDefault();

    const commentTextArea = document.getElementById(COMMENT_TEXT_AREA_ID);
    const commentText = commentTextArea.value;

    if (commentText === '') {
        return;
    }

    const jwt = retrieveJWT();
    const commentPayload = {
        uid: decodeJWT(jwt).sub,
        post_id: postId,
        comment: commentText
    }

    const request = await postData('comment', commentPayload, jwt);

    if (request.ok) {
        const comment = {
            post_id: postId,
            comment: commentText,
            img_url: retrieveUserLogo(),
            username: retrieveUsername(),
        };
        const newCommentElement = await createCommentFromTemplate(comment);
        document.getElementById(COMMENT_CONTAINER_ID).insertAdjacentHTML('afterbegin', newCommentElement);
        commentTextArea.value = '';
        document.getElementById(NO_COMMENT_ID).style.display = 'none';
    } else {
        alert('Could not post comment, try again.');
    }
}