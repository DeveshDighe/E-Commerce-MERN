import axios from "axios";

// export const API_BASE_URL = 'https://e-commerce-mern-project-apis.onrender.com/';
export const API_BASE_URL = 'https://e-commerce-mern-gold.vercel.app';
// export const API_BASE_URL = 'http://localhost:8000/';

const jwt = localStorage.getItem('JwT');

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Authorization': jwt ? `Bearer ${jwt}` : null,
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((req) => {
    const jwt = localStorage.getItem('JwT');

    req.headers.Authorization = jwt ? `Bearer ${jwt}` : null

    return req
})
