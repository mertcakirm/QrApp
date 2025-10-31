import axios from "axios";
import {getCookie} from "../components/cookie/Cookie.js";

export const BaseUrl = "http://localhost:8080/api/";

const api = axios.create({
    baseURL: BaseUrl,
});

api.interceptors.request.use((config) => {
    const token = getCookie("token");

    if (!config.headers["NoAuth"] && token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    delete config.headers["NoAuth"];
    return config;
});

export default api;