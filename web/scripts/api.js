const BASE_API_URL = 'https://localhost:8080/api/v1';

// async function getPostById(postId) {
//     const query = `${BASE_API_URL}${API_PATH}post/${postId}`;
//     const response = await fetch(query);
//     const responseData = await response.json();

//     return responseData;
// }
// //TODO : try catches
// async function getUsernameById(accountId) {
//     const query = `${BASE_API_URL}${API_PATH}account/${accountId}`;
//     const response = await fetch(query);
//     const responseData = await response.json();
//     return responseData.username;
// }

// async function getPostContent(postId) {
//     const postData = await getPostById(postId);
//     const postUsername = await getUsernameById(postData.account_id);
//     const result = {
//         postId: postId,
//         username: postUsername,
//         title: postData.title,
//         body: postData.body
//     }

//     return result;
// }

function getData(endpoint, payload, jwt) {
    return fetch(BASE_API_URL, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: payload
    });
}

export { getData }