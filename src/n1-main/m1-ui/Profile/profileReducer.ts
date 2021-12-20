import profileAPI, {ProfileType} from "./api-profile";
import {setIsLoading} from "../appReducer";
import {Dispatch} from "redux";

const initialState = {
    name: "user name",
    avatar: "https://cdn-icons-png.flaticon.com/512/4530/4530930.png",
    cards: []
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case "PROFILE/CHANGE_USER_NAME":
            return {
                ...state, name: action.userName
            }
        case "PROFILE/SET_CARDS":
            return {
                ...state, cards: [...action.cards]
            }
        default:
            return state
    }
}

// actions
export const changeUserNameAC = (userName: string) => ({type: 'PROFILE/CHANGE_USER_NAME', userName} as const)
export const setCards = (cards: any) => ({type: 'PROFILE/SET_CARDS', cards} as const)

//thunk
export const changeUserNameTC = (data: ProfileType) => (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    profileAPI.changeUserName(data)
        .then((res) => {
            dispatch(changeUserNameAC(res.data.updatedUser.name))
            dispatch(setIsLoading('idle'))
        })
        .catch(error => {
            dispatch(setIsLoading('error'))
        })
}

export const getCardsPack = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))

    try {
        dispatch(setIsLoading('idle'))
        const res = await profileAPI.getCards({})
        dispatch(setCards(res.data.cardPacks))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}
// type
type ProfileInitialStateType = typeof initialState

type ChangeUserNameActionType = ReturnType<typeof changeUserNameAC>
type ProfileActionType = ChangeUserNameActionType | ReturnType<typeof setIsLoading> | ReturnType<typeof setCards>