import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/api",
    headers: { "Content-Type": "application/json" }
});

export default API;
