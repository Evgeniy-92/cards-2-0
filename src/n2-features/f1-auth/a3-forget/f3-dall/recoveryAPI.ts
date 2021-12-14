import axios, {AxiosResponse} from 'axios'


const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0', /*http://localhost:7542/2.0/*/
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

export type FormikErrorType = {
    email: string
}

export type ForgotParamsType = FormikErrorType & {
    from: string
    message: string
}