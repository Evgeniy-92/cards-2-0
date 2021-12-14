import {Dispatch} from "redux";
import {ForgotParamsType, recoveryAPI, ResponseForgotType} from "../f3-dall/recoveryAPI";

const initialState = {
    isForgotten: false
}

export const recoveryReducer = (state: RecoveryInitialStateType = initialState, action: RecoveryActionType) => {
    switch (action.type) {
        case "FORGOT-PASSWORD":
            return {
                ...state
                ,isForgotten: action.value
            }
        default:
            return state
    }
}

// actions
export const setIsForgotten = (value: boolean) => ({type: 'FORGOT-PASSWORD', value})

// thunks
export const forgotPassword = (email: string) => (dispatch: Dispatch) => {
    const data = {
        email: email,
        from: 'test-front-admin <ev.drozd.2020@gmail.com>',
        message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/new-pass/$token$'>link</a></div>`,
    }
    recoveryAPI.forgot(data)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
}


// type
export type RecoveryInitialStateType = typeof initialState
export type RecoveryActionType = ReturnType<typeof setIsForgotten>