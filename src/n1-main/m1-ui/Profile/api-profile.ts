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
    getCards: (getParamsCards: getParamsType) => {
        return axiosInstance.get("cards/pack", {params: getParamsCards})
    },
    addNewPack: (data: getParamsNewPackType) => {
        return axiosInstance.post("/cards/pack", data)
    },
    getCard: (getParamsCard: getParamsCardType) => {
        return axiosInstance.get("/cards/card", {params: getParamsCard})
    }
};

export type getParamsCardType = {
    cardAnswer?: string
    cardQuestion?: string
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}

export type getParamsNewPackType = {
    cardsPack: cardsPackType
}

export type cardsPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type getParamsType = {
    packName?: string,
    min?: number,
    max?: number,
    sortPacks?: number | string,
    page?: number,
    pageCount?: number,
    user_id?: string,
}

export type ProfileType = {
    name: string
    avatar?: string
}

export default profileAPI;