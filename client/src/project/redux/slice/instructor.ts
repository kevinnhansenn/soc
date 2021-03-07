import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Account {
    username: string,
    password: string
}

interface InstructorState {
    account: Account
}

const initialState: InstructorState = {
    account: {
        username: 'Kevin',
        password: 'Hansen'
    }
}

export const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        updateAccount: (state, action: PayloadAction<Account>) => {
            state.account = action.payload
        }
    }
})

export const { updateAccount } = instructorSlice.actions

export default instructorSlice.reducer
