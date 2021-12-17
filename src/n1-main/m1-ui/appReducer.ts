import {Dispatch} from "redux";
import {authApi} from "./apiApp";
import {changeUserNameAC} from "./Profile/profileReducer";

const initialState = {
    isLoading: 'idle' as IsLoadingType,
    inAuth: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/IS_LOADING":
            return {...state, isLoading: action.isLoading}

        case "APP/IN_AUTH":
            return {...state, inAuth: action.inAuth}

        default:
            return state
    }
}

//action creator
export const setIsLoading = (isLoading: IsLoadingType) => ({type: 'APP/IS_LOADING', isLoading} as const)
export const SetInAuth = (inAuth: boolean) => ({type: 'APP/IN_AUTH', inAuth} as const)

//thunk
export const inAuthTC = () => (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    return authApi.inAuth()
        .then((res) => {
            dispatch(setIsLoading('idle'))
            dispatch(SetInAuth(true))
            dispatch(changeUserNameAC(res.data.name))
        })
        .catch((err) => {
            dispatch(setIsLoading('error'))
            dispatch(SetInAuth(false))
        })
}


//types
export type IsLoadingType = 'idle' | 'loading' | 'success' | 'error'

type InitialStateType = typeof initialState
type ActionType = ReturnType<typeof setIsLoading>
    | ReturnType<typeof SetInAuth>
    | ReturnType<typeof changeUserNameAC>