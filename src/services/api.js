import axios from "axios";

export const api = axios.create({
    baseURL: 'https://backend-notes-9w3f.onrender.com'
});