import profileAPI, {ProfileType} from "./api-profile";
import {setIsLoading} from "../appReducer";
import {Dispatch} from "redux";

const initialState = {
    name: "user name",
    avatar: "https://cdn-icons-png.flaticon.com/512/4530/4530930.png",
    cards: [] as CardType[]
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType):ProfileInitialStateType  => {
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
export const setCards = (cards: CardType[]) => ({type: 'PROFILE/SET_CARDS', cards} as const)

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
        const res = await profileAPI.getCards({pageCount: 8})
        dispatch(setCards(res.data.cardPacks))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}
// type
type ProfileInitialStateType = typeof initialState
export type GetCardsType = {
    cardPacks: [
        CardType
    ]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type CardType = {
    _id: string
    user_id: string
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
    user_name: string
    private: boolean
    more_id: string
}
// cardsCount: 0 +
// created: "2021-12-20T10:35:49.557Z" +
// grade: 0 +
// more_id: "61afb962b758546d4074c639" +
// name: "123" +
// path: "/def" +
// private: false +
// rating: 0 +
// shots: 0 +
// type: "pack" +
// updated: "2021-12-20T10:35:49.557Z" +
// user_id: "61afb962b758546d4074c639" +
// user_name: "dddima@mail.ru" +
// __v: 0 +
// _id: "61c05c85a455b89f906270f9" +
type ChangeUserNameActionType = ReturnType<typeof changeUserNameAC>
type ProfileActionType = ChangeUserNameActionType | ReturnType<typeof setIsLoading> | ReturnType<typeof setCards>