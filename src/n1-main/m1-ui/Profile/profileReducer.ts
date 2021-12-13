
const initialState = {}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType) => {
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
export type ProfileInitialStateType = typeof initialState
export type ProfileActionType = ReturnType<typeof newAC>