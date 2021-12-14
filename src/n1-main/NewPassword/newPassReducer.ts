import {Dispatch} from "redux";
import {newPasswordAPI} from "./newPasswordAPI";

const initialState = {
    error: '',
    success: false
}

export const newPassReducer = (state: NewPassInitialStateType = initialState, action: NewPassActionType) => {
    switch (action.type) {
        case "SET-ERROR":
            return {
                ...state,
                error: action.message
            }
        case "SET-SUCCESS":
            return {
                ...state,
                success: action.value
            }
        default:
            return state
    }
}

// actions
export const setError = (message: string) => ({type: 'SET-ERROR', message} as const)
export const setSuccess = (value: boolean) => ({type: 'SET-SUCCESS', value} as const)

// thunk
export const setPassword = (token: string, password: string, password2: string) => (dispatch: Dispatch) => {
    (password !== password2)
        ? dispatch(setError("Passwords don't match!"))
        : newPasswordAPI.setNewPassword(password, token)
            .then(res => {
                dispatch(setSuccess(true))
            })
            .catch(err => {
                console.log(err.response.data.error)
            })
}

// type
export type NewPassInitialStateType = typeof initialState
export type NewPassActionType =
    ReturnType<typeof setError>
    | ReturnType<typeof setSuccess>