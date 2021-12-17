import axios from 'axios';
import {serverAPI} from "../common/helpers/findServer";

const instance = {
    baseURL: serverAPI,
    withCredentials: true
};

const axiosInstance = axios.create(instance);

export const profileAPI = {
    changeUserName: (data: ProfileType) => {
        return axiosInstance.put("auth/me", data)
    },
};

export type ProfileType = {
    name: string
    avatar?: string
}


export default profileAPI;