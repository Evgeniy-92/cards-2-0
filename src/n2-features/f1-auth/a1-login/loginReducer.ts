
const initialState = {}

export const loginReducer = (state: LoginInitialStateType = initialState, action: LoginActionType) => {
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
export type LoginInitialStateType = typeof initialState
export type LoginActionType = ReturnType<typeof newAC>