/** Shared HTTP transport: use the configured API base, attach bearer tokens, and redirect invalid sessions. */
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
export const api = axios.create(
    {
        baseURL:import.meta.env.VITE_BASE_API_URL,
        headers:{
            'Content-Type':'application/json',
        }
    }
)

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        try {
            const { exp } = jwtDecode(token);
            if (exp && Date.now() >= exp * 1000) {
                localStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(new Error("Token expired"));
            }
        } catch {
            localStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(new Error("Invalid token"));
        }

        config.headers.Authorization = `Bearer ${token}`
    }

    return config ;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401){
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)
