import axios from "axios";

export const API_BASE_URL = 'https://e-commerce-mern-project-apis.onrender.com/';
// export const API_BASE_URL = 'http://localhost:8000/';

const jwt = localStorage.getItem('JwT');

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Authorization': jwt ? `Bearer ${jwt}` : null,
        'Content-Type': 'application/json'
    }
});
