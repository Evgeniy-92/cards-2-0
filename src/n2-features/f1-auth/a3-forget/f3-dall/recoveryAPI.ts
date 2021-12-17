import axios, {AxiosResponse} from 'axios'
import {serverAPI} from "../../../../n1-main/m1-ui/common/helpers/findServer";


const instance = axios.create({
    baseURL: serverAPI,
    withCredentials: true,
})

export const recoveryAPI = {
    forgot(data: ForgotParamsType) {
        return instance.post<ForgotParamsType, AxiosResponse<ResponseForgotType>>('/auth/forgot', data)
    }
}

// type
export type ResponseForgotType = {
    info: string
    error: string
}

export type FormikErrorRecoveryType = {
    email: string
}

export type ForgotParamsType = FormikErrorRecoveryType & {
    from: string
    message: string
}