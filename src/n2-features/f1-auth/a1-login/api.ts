import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const loginApi = {
    inLogin(data: inLoginType) {
        return instance.post('auth/login', data)
    },
    logout() {
        return instance.delete('auth/me')
    }
}

export type inLoginType = {
    email: string
    password: string
    rememberMe?: boolean
}