import {inLoginType, loginApi} from "./api";
import {Dispatch} from "redux";
import {SetInAuth, setIsLoading} from "../../../n1-main/m1-ui/appReducer";
import {changeUserNameAC} from "../../../n1-main/m1-ui/Profile/profileReducer";

const initialState = {
    error: ''
}

export const loginReducer = (state: LoginInitialStateType = initialState, action: ActionType): LoginInitialStateType => {
    switch (action.type) {
        case "SET_ERROR":
            return {
                ...state, error: action.error
            }
        default:
            return state
    }
}

// actions
export const setError = (error: string) => ({type: 'SET_ERROR', error} as const)

//thunk logout
export const inLoginTC = (data: inLoginType) => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        const res = await loginApi.inLogin(data)
        dispatch(setIsLoading('idle'))
        dispatch(setError(''))
        dispatch(SetInAuth(true))
        dispatch(changeUserNameAC(res.data.name))
    } catch (err: typeof err) {
        dispatch(setIsLoading('error'))
        dispatch(setError(err.response.data.error))
    }
    // return loginApi.inLogin(data)
    //     .then((res) => {
    //         dispatch(setIsLoading('idle'))
    //         dispatch(setError(''))
    //         dispatch(SetInAuth(true))
    //         dispatch(changeUserNameAC(res.data.name))
    //     })
    //     .catch((err) => {
    //         dispatch(setIsLoading('error'))
    //         dispatch(setError(err.response.data.error))
    //     })
}

export const logoutTC = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        await loginApi.logout()
        dispatch(setIsLoading('idle'))
        dispatch(SetInAuth(false))
    } catch (err) {
        dispatch(setIsLoading('error'))
    }
}

// type
export type LoginInitialStateType = {
    error: string
}

type ActionType = ReturnType<typeof setError>