import axios from "axios";
export const pythonAPI = axios.create({
    baseURL: "http://localhost:8800",
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});
