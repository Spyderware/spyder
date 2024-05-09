import { fetchContent } from "./page-loader.js";
import { HTML_DIR } from "./config.js";

const ContentTemplates = Object.freeze({
    PostTemplate: `${HTML_DIR}postTemplate`,
    CommentTemplate: `${HTML_DIR}commentTemplate`,
});
// TODO 
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
    if (!('post_id' in postData && 'username' in postData && 'title' in postData && 'body' in postData && 'img_url' in postData && 'category' in postData)) {
        throw new Error("postData must contain 'postId', 'category', 'username', 'title', and 'body' fields.");
    }

    const parser = new DOMParser();
    const postTemplate = await fetchContent(ContentTemplates.PostTemplate);

    const postDoc = parser.parseFromString(postTemplate, 'text/html');

    const hrefElement = postDoc.getElementById('post-');
    hrefElement.setAttribute('href', `/post/${postData.post_id}`);
    hrefElement.setAttribute('id', `post-${postData.post_id}`);

    const titleElement = postDoc.getElementById('title-id');
    titleElement.innerText = postData.title;
    titleElement.removeAttribute('id');

    const categoryElement = postDoc.getElementById('category-id');
    categoryElement.innerText = 'Category: ' + postData.category;
    categoryElement.removeAttribute('id');

    const usernameElement = postDoc.getElementById('username-id');
    usernameElement.innerText = postData.username;
    usernameElement.removeAttribute('id');

    const bodyElement = postDoc.getElementById('post-body-id');
    bodyElement.innerText = postData.body;
    bodyElement.removeAttribute('id');

    const userImgElement = postDoc.getElementById('user-img-id');
    if (postData.img_url) {
        userImgElement.setAttribute('src', postData.img_url);
    }
    userImgElement.removeAttribute('id');

    return postDoc.documentElement.innerHTML;
}

/**
 * This function loads a generic `comment` template and injects the comment data into its respective field.
 * @param {{
* post_id,
* username,
* comment,
* img_url
* }} commentData - the data / content for a specific comment.
* @returns a comment template populated with the provided data.
*/
async function createCommentFromTemplate(commentData) {
    if (!('post_id' in commentData && 'username' in commentData && 'comment' in commentData && 'img_url' in commentData)) {
        throw new Error("commentData must contain 'commentId', 'username', and 'body' fields.");
    }

    const usrImgId = 'comment-user-img-id';
    const usernameId = 'comment-username';
    const bodyId = 'comment-body-id';

    const parser = new DOMParser();
    const commentTemplate = await fetchContent(ContentTemplates.CommentTemplate);

    const commentDoc = parser.parseFromString(commentTemplate, 'text/html');

    const usernameElement = commentDoc.getElementById(usernameId);
    usernameElement.innerText = commentData.username;
    usernameElement.removeAttribute('id');

    const bodyElement = commentDoc.getElementById(bodyId);
    bodyElement.innerText = commentData.comment;
    bodyElement.removeAttribute('id');

    const userImgElement = commentDoc.getElementById(usrImgId);
    if (commentData.img_url) {
        userImgElement.setAttribute('src', commentData.img_url);
    }
    userImgElement.removeAttribute('id');

    return commentDoc.documentElement.innerHTML;
}

export { ContentTemplates, createPostFromTemplate, createCommentFromTemplate }