import { getData } from "./api.js";
import { retrieveJWT } from "./auth.js";

async function getCategories() {
    const jwt = retrieveJWT();
    const response = await getData(`category`, jwt);

    let categories = [];
    try {
        categories = await response.json();
        categories = categories.map(category => category.category);
    } catch (error) {
        console.error('Could not fetch category list.');
    }

    return categories;
}

function createHtmlCategoryOption(value, text) {
    const option = document.createElement('option');
    option.value = value;
    option.innerText = text;
    return option;
}

async function populateCategoryDropdown(selectTagId) {
    const selElement = document.getElementById(selectTagId);
    selElement.innerHTML = '';

    const defaultOption = createHtmlCategoryOption('', 'Select Category');
    selElement.insertAdjacentElement('beforeend', defaultOption);
    
    const categories = await getCategories();
    for (const category of categories) {
        const option = createHtmlCategoryOption(category, category);
        selElement.insertAdjacentElement('beforeend', option);
    }
}

export { populateCategoryDropdown }