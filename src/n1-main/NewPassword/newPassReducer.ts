
const initialState = {}

export const newPassReducer = (state: NewPassInitialStateType = initialState, action: NewPassActionType) => {
    switch (action.type) {
        case "NEW":
            return {
                ...state
            }
        default:
            return state
    }
}

// actions
export const newAC = () => ({type: 'NEW'})


// type
export type NewPassInitialStateType = typeof initialState
export type NewPassActionType = ReturnType<typeof newAC>