import profileAPI, {ProfileType} from "./api-profile";
import {setIsLoading} from "../appReducer";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../m2-bll/store";

const initialState = {
    name: "user name",
    avatar: "https://cdn-icons-png.flaticon.com/512/4530/4530930.png",
    cards: null as (null | GetCardsType),
    sortName: 'updated',
    sortByCards: 0 as (0 | 1),
    packName: "",
    newCard: {},
    page: 1,
    rowsPerPage: 8
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case "PROFILE/CHANGE_USER_NAME":
            return {
                ...state, name: action.userName
            }
        case "PROFILE/SET_CARDS":
            return {
                ...state, cards: action.cards
            }
        case "PROFILE/CHANGE_SORT_CARDS":
            return {
                ...state, sortByCards: action.sort, sortName: action.sortName
            }
        case "PROFILE/CHANGE-PACK-NAME":
            return {
                ...state, packName: action.value
            }
        case "PROFILE/SET-PAGE":
            return {
                ...state,
                page: action.newPage
            }
        case "PROFILE/SET-ROWS-PER-PAGE":
            return {
                ...state,
                rowsPerPage: action.value
            }
        default:
            return state
    }
}

// actions
export const changeUserNameAC = (userName: string) => ({type: 'PROFILE/CHANGE_USER_NAME', userName} as const)
export const setCards = (cards: GetCardsType) => ({type: 'PROFILE/SET_CARDS', cards} as const)
export const setChangeSortCards = (sort: 0 | 1, sortName: string) => ({
    type: 'PROFILE/CHANGE_SORT_CARDS',
    sort,
    sortName
} as const)
export const changePackName = (value: string) => ({type: 'PROFILE/CHANGE-PACK-NAME', value} as const)
export const addPack = (newPack: CardType) => ({type: 'PROFILE/ADD-PACK', newPack} as const)
export const setPage = (newPage: number) => ({type: 'PROFILE/SET-PAGE', newPage} as const)
export const setRowsPerPage = (value: number) => ({type: 'PROFILE/SET-ROWS-PER-PAGE', value} as const)


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

export const getCardsPack = (sortCards: number, sortName: string) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const packName = state.profile.packName
    const page = state.profile.page
    const pageCount = state.profile.rowsPerPage
    dispatch(setIsLoading('loading'))

    try {
        dispatch(setIsLoading('idle'))
        const res = await profileAPI.getCards({pageCount, page, packName, sortPacks: sortCards + sortName})
        dispatch(setCards(res.data))
        console.log(res.data)
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}

export const addCardPack = () => async (dispatch: Dispatch) => {
    dispatch(setIsLoading('loading'))
    try {
        const res = await profileAPI.addNewPack({cardsPack: {}})
        dispatch(setIsLoading('idle'))
    }catch (e) {
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
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

type ChangeUserNameActionType = ReturnType<typeof changeUserNameAC>
type ProfileActionType =
    ChangeUserNameActionType
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setCards>
    | ReturnType<typeof setChangeSortCards>
    | ReturnType<typeof changePackName>
    | ReturnType<typeof addPack>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setRowsPerPage>