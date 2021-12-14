import registrationAPI, {RegistrationType} from "./api-registration";
import {Dispatch} from "redux";

const initialState = {
    isRegistrate: false
}

export const registerReducer = (state: RegisterInitialStateType = initialState, action: RegisterActionType) => {
    switch (action.type) {
        case "REGISTRATION":
            return {
                ...state, isRegistrate: true
            }
        default:
            return state
    }
}

export const registrateAC = () => ({type: 'REGISTRATION'})

export const registrateTC = (data: RegistrationType) => (dispatch: Dispatch<RegisterActionType>) => {

    registrationAPI.registration(data)
        .then((res) => {
            dispatch(registrateAC())
        })
        .catch(error => {
            //console.log(error.error)
        })
}

// type
export type RegisterInitialStateType = typeof initialState
export type RegisterActionType = ReturnType<typeof registrateAC>