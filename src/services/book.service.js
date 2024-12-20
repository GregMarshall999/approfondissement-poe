import axios from "axios";

const API_INDEX = import.meta.env.VITE_JSON_SERVER_INDEX;
const ENDPOINT = `${API_INDEX}/books`;

export const findBooks = () => {
    return axios.get(ENDPOINT);
}

export const createBook = product => {
    return axios.post(ENDPOINT, product);
}

export const updateBook = (id, updatedProduct) => {
    return axios.put(`${ENDPOINT}/${id}`, updatedProduct);
}

export const deleteBook = id => {
    return axios.delete(`${ENDPOINT}/${id}`);
}