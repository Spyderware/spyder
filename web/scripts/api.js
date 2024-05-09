import { BASE_API_URL } from "./config.js";
 
function postData(endpoint, payload, jwt) {
    return fetch(`${BASE_API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: payload
    });
}
 
function getData(endpoint, jwt) {
    return fetch(`${BASE_API_URL}/${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });
}
 
export { getData, postData }