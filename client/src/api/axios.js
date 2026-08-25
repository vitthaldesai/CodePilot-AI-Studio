
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


// ============================================================
// ADD JWT TOKEN TO REQUESTS
// ============================================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// ============================================================
// HANDLE EXPIRED / INVALID TOKEN
// ============================================================

api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            // Only redirect if user is not already
            // on an authentication page
            const path = window.location.pathname;

            if (
                path !== "/login" &&
                path !== "/register"
            ) {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default api;