

const initialState = {

}

export const recoveryReducer = (state: RecoveryInitialStateType = initialState, action: RecoveryActionType) => {
    switch (action.type) {
        case "FORGOT-PASSWORD":
            return {
                ...state

            }
        default:
            return state
    }
}

// actions
export const setIsForgotten = (value: boolean) => ({type: 'FORGOT-PASSWORD', value})

// thunks
export const forgotPassword = () => () => {

}


// type
export type RecoveryInitialStateType = typeof initialState
export type RecoveryActionType = ReturnType<typeof setIsForgotten>