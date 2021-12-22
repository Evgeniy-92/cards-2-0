import axios from 'axios';
import {serverAPI} from "../../n1-main/m1-ui/common/helpers/findServer";

const instance = {
    baseURL: serverAPI,
    withCredentials: true
};

const axiosInstance = axios.create(instance);

export const profileAPI = {
    getCards: (getParamsCards: getParamsCardsType) => {
        return axiosInstance.get("cards/card", {params: getParamsCards})
    },
    // addNewPack: () => {
    //     return axiosInstance.post("/cards/pack", data)
    // }
};

// type
export type getParamsCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string | undefined
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}


export default profileAPI;