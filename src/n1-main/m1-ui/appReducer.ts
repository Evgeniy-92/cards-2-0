import {Dispatch} from "redux";
import {authApi} from "./apiApp";

const initialState = {
    isLoading: 'idle' as IsLoadingType,
    inAuth: false,
    name: "user name",
}

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "APP/IS_LOADING":
            return {...state, isLoading: action.isLoading}

        case "APP/IN_AUTH":
            return {...state, inAuth: action.inAuth}
        case "APP/SET_USER_NAME":
            return {...state, name: action.userName}

        default:
            return state
    }
}

//action creator
export const setIsLoading = (isLoading: IsLoadingType) => ({type: 'APP/IS_LOADING', isLoading} as const)
export const SetInAuth = (inAuth: boolean) => ({type: 'APP/IN_AUTH', inAuth} as const)
export const SetUserName = (userName: string) => ({type: 'APP/SET_USER_NAME', userName} as const)
export const changeUserNameAC = (name: string) => ({type: 'PROFILE/CHANGE_USER_NAME', name} as const)

//thunk
export const inAuthTC = (data?: any) => (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    return authApi.inAuth(data)
        .then((res) => {
            dispatch(setIsLoading('idle'))
            dispatch(SetInAuth(true))
            dispatch(SetUserName(res.data.name))
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
    | ReturnType<typeof SetUserName>
    | ReturnType<typeof changeUserNameAC>