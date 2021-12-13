
const initialState = {}

export const registerReducer = (state: RegisterInitialStateType = initialState, action: RegisterActionType) => {
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
export type RegisterInitialStateType = typeof initialState
export type RegisterActionType = ReturnType<typeof newAC>