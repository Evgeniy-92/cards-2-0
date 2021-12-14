import {Dispatch} from "redux";
import {recoveryAPI} from "../f3-dall/recoveryAPI";

const initialState = {
    isForgotten: false,
    email: '',
    error: ''
}

export const recoveryReducer = (state: RecoveryInitialStateType = initialState, action: RecoveryActionType) => {
    switch (action.type) {
        case "FORGOT-PASSWORD":
            return {
                ...state
                ,isForgotten: action.value
                ,email: action.email
            }
        case "SET-ERROR":
            return {
                ...state,
                error: action.err
            }
        default:
            return state
    }
}

// actions
export const setIsForgotten = (value: boolean, email: string) => ({type: 'FORGOT-PASSWORD', value, email} as const)
export const setError = (err: string) => ({type: 'SET-ERROR', err} as const)

// thunks
export const forgotPassword = (email: string) => (dispatch: Dispatch) => {
    const data = {
        email: email,
        from: 'test-front-admin <ev.drozd.2020@gmail.com>',
        message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/new-pass/$token$'>link</a></div>`,
    }
    recoveryAPI.forgot(data)
        .then(res => {
            dispatch(setIsForgotten(true, email))
        })
        .catch(err => {
            dispatch(setError(err.response.data.error))
        })
}


// type
export type RecoveryInitialStateType = typeof initialState
export type RecoveryActionType = ReturnType<typeof setIsForgotten> | ReturnType<typeof setError>