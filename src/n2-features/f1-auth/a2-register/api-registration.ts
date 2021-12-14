import axios from 'axios';

const instance = {
    baseURL:
        "http://localhost:7542/2.0/",
};

const axiosInstance = axios.create(instance);

export const registrationAPI = {
    registration: (data: RegistrationType) => {
        return axiosInstance.post("auth/register", data)
    },
};

export type RegistrationType = {
    email: string
    password: string
}


export default registrationAPI;