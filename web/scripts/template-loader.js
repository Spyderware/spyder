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
    if (!('post_id' in postData && 'username' in postData && 'title' in postData && 'body' in postData && 'img_url' in postData)) {
        throw new Error("postData must contain 'postId', 'username', 'title', and 'body' fields.");
    }

    let postTemplate = await fetchContent(ContentTemplates.PostTemplate);

    postTemplate = postTemplate.replace(/##POST_ID##/g, postData.post_id)
        .replace(/##POST_USERNAME##/g, postData.username)
        .replace(/##POST_TITLE##/g, postData.title)
        .replace(/##POST_BODY##/g, postData.body);

    return postTemplate;
}

/**
 * This function loads a generic `comment` template and injects the comment data into its respective field.
 * @param {{
* commentId,
* username,
* body
* }} commentData - the data / content for a specific comment.
* @returns a comment template populated with the provided data.
*/
async function createCommentFromTemplate(commentData) {
    if (!('post_id' in commentData && 'username' in commentData && 'comment' in commentData && 'img_url' in commentData)) {
        throw new Error("commentData must contain 'commentId', 'username', and 'body' fields.");
    }

    let commentTemplate = await fetchContent(ContentTemplates.CommentTemplate);

    commentTemplate = commentTemplate.replace(/##COMMENT_USERNAME##/g, commentData.username)
        .replace(/##COMMENT_BODY##/g, commentData.comment);

    return commentTemplate;
}

export { ContentTemplates, createPostFromTemplate, createCommentFromTemplate }