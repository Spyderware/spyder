import { SEARCH_EVENT_NAME } from "./config.js"

addEventListener(SEARCH_EVENT_NAME, search);

function search(event) {
    console.log(event.payload)
}