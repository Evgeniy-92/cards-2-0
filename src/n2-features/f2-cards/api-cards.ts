import axios from 'axios';
import {serverAPI} from "../../n1-main/m1-ui/common/helpers/findServer";

const instance = {
    baseURL: serverAPI,
    withCredentials: true
};

const axiosInstance = axios.create(instance);

export const profileAPI = {
    getCards: () => {
        return axiosInstance.get("cards/pack", {params: {}})
    },
    // addNewPack: () => {
    //     return axiosInstance.post("/cards/pack", data)
    // }
};



export default profileAPI;