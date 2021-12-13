import {inLoginType, loginApi} from "./api";
import {Dispatch} from "redux";

const initialState = {
    error: '',
    isLogin: false,
}

export const loginReducer = (state: LoginInitialStateType = initialState, action: ActionType): LoginInitialStateType => {
    switch (action.type) {
        case "SET_ERROR":
            return {
                ...state, error: action.error
            }

        case 'IS_LOGIN':
            return {
                ...state, isLogin: action.isLogin
            }
        default:
            return state
    }
}

// actions
export const setError = (error: string) => ({type: 'SET_ERROR', error} as const)
export const setLogin = (isLogin: boolean) => ({type: 'IS_LOGIN', isLogin} as const)

//thunk logout
export const inLoginTC = (data: inLoginType) => (dispatch: Dispatch) => {
    return loginApi.inLogin(data)
        .then((res) => {
            dispatch(setLogin(true))
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error))
        })
}

export const logoutTC = () => (dispatch: Dispatch) => {
    return loginApi.logout().then(() => dispatch(setLogin(false)))
}
// type
export type LoginInitialStateType = {
    error: string
    isLogin: boolean
}

type ActionType = ReturnType<typeof setLogin> | ReturnType<typeof setError>