import axios from 'axios';

const instance = {
    baseURL:
        "http://localhost:7542/2.0/",
    withCredentials: true
};

const axiosInstance = axios.create(instance);

export const profileAPI = {
    changeUserName: (data:ProfileType) => {
        return axiosInstance.put("auth/me", data)
    },
};

export type ProfileType = {
    name: string
    avatar?: string
}


export default profileAPI;