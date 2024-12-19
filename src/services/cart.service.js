import axios from "axios"

const API_INDEX = import.meta.env.VITE_JSON_SERVER_INDEX;
const ENDPOINT = `${API_INDEX}/cart`;

export const getAllCartItems = () => {
    return axios.get(ENDPOINT);
}

export const findByArticleName = articleName => {
    return axios.get(`${ENDPOINT}?name=${articleName}`);
}

export const addArticleToCart = article => {
    return axios.post(ENDPOINT, article);
}

export const updateArticle = article => {
    return axios.put(`${ENDPOINT}/${article.id}`, article);
}

export const removeArticle = articleId => {
    return axios.delete(`${ENDPOINT}/${articleId}`);
}