import { postData } from './api.js';
import { decodeJWT, retrieveJWT } from './auth.js';
import { populateCategoryDropdown } from './category-loader.js';
import { changeRoute } from './router.js';

// ===================== Constants ======================
const NEW_POST_SELECT_ID = 'fcategories';

// ===================== Init ======================

addEventListener('newpost-init', initPage);
initPage();

// =================== Functions ===================

async function initPage() {
    document.getElementById('NewPostForm').addEventListener('submit', createPost);
    await populateCategoryDropdown(NEW_POST_SELECT_ID);
}

async function createPost(event) {
    event.preventDefault();

    const categoryVal = document.getElementById('fcategories').value;
    const titleVal = document.getElementById('fPostTitle').value;
    const bodyVal = document.getElementById('fPostBody').value;

    const jwt = retrieveJWT();
    const postPayload = {
        uid: decodeJWT(jwt).sub,
        title: titleVal,
        body: bodyVal,
        category: categoryVal
    }

    const request = await postData('post', postPayload, jwt);
    const postResponse = await request.json();

    if (postResponse.post_id) {
        changeRoute(`post/${postResponse.post_id}`, false);
    }
}