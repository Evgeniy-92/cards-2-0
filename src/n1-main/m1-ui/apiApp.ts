import axios from "axios";
import {serverAPI} from "./common/helpers/findServer";

const instance = axios.create({
    baseURL: serverAPI,
    withCredentials: true,
})

export const authApi = {
    inAuth(data?: inLoginType) {
        return instance.post('auth/me', data)
    },
}

export type inLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}