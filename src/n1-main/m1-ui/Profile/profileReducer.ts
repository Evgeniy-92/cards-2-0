import profileAPI, {ProfileType} from "./api-profile";
import {inAuthTC, setIsLoading} from "../appReducer";
import { ThunkAction } from "redux-thunk";
import {AppRootStateType} from "../../m2-bll/store";

const initialState = {
    name: "user name",
    avatar: "https://cdn-icons-png.flaticon.com/512/4530/4530930.png"
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "PROFILE/CHANGE_USER_NAME":
            return {
                ...state, userName: action.userName
            }
        default:
            return state
    }
}

// actions
const changeUserNameAC = (userName: string) => ({type: 'PROFILE/CHANGE_USER_NAME', userName} as const)

export const changeUserNameTC = (data:ProfileType): ThunkAction<void, AppRootStateType, unknown, ProfileActionType> => (dispatch) => {
    dispatch(setIsLoading('loading'))
    profileAPI.changeUserName(data)
        .then((res) => {
            dispatch(changeUserNameAC(data.name))
            dispatch(inAuthTC())
            dispatch(setIsLoading('idle'))
        })
        .catch(error => {
            /*dispatch(registrateAC(false))
            dispatch(setIsLoading('error'))
            dispatch(setErrorAC(error.response.data.error))
            setTimeout(() => {
                dispatch(setErrorAC(""))
            }, 6000)*/
        })
}
// type
type ProfileInitialStateType = typeof initialState

type ChangeUserNameActionType = ReturnType<typeof changeUserNameAC>
type ProfileActionType = ChangeUserNameActionType | ReturnType<typeof setIsLoading>