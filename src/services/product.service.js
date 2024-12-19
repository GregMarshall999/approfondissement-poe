import axios from "axios"

const API_INDEX = import.meta.env.VITE_JSON_SERVER_INDEX;
const ENDPOINT = `${API_INDEX}/products`;

export const findProducts = () => {
    return axios.get(ENDPOINT);
}

export const createProduct = product => {
    return axios.post(ENDPOINT, product);
}

export const updateProduct = (id, updatedProduct) => {
    return axios.put(`${ENDPOINT}/${id}`, updatedProduct);
}

export const deleteProduct = id => {
    return axios.delete(`${ENDPOINT}/${id}`);
}