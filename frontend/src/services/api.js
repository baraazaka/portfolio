import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getDashboardStats = async () => {
    const response = await api.get("/dashboard");
    return response.data;
};
export const getProjects = async () => {
    const response = await api.get("/projects");
    return response.data;
};
export async function getMyProjects() {
    const response = await api.get("/projects/my");
    return response.data;
};
export const getMySkills = async () => {
    const response = await api.get("/skills/my");
    return response.data;
};

export default api;