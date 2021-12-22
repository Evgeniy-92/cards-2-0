import {Dispatch} from "redux";
import {AppRootStateType} from "../../n1-main/m2-bll/store";
import {setIsLoading} from "../../n1-main/m1-ui/appReducer";
import profileAPI from "./api-cards";

const initialState = {
   cards: {} as GetCardsType,

}

export const cardsReducer = (state: CardsInitialStateType = initialState, action: CardsActionType): CardsInitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {
                ...state,
                cards: action.cards
            }
        default:
            return state
    }
}

// actions
export const setCards = (cards: GetCardsType) => ({type: 'CARDS/SET-CARDS', cards} as const)

//thunk
export const getCards = (cardsPack_id: string | undefined) => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setIsLoading('loading'))
    try {
        dispatch(setIsLoading('idle'))
        const res = await profileAPI.getCards({cardsPack_id})
        dispatch(setCards(res.data))
    } catch (e) {
        dispatch(setIsLoading('error'))
    }
}

// type
type CardsInitialStateType = typeof initialState
export type GetCardsType = {
    cards: [
        CardType
    ]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}

type CardsActionType = ReturnType<typeof setCards>
