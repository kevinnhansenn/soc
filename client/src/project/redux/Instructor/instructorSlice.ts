import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from './instructorStore'
import { STATUS_INSTRUCTOR } from '../../util/Enum'

export interface Account {
    username: string,
    password: string
}

export interface Choice {
    id: number,
    text: string,
    answer: boolean,
    placeholder: string
}

interface InstructorState {
    account: Account,
    room: number | undefined,
    status: STATUS_INSTRUCTOR,
    participants: string[],
    question: string,
    choices: Choice[]
}

const initialState: InstructorState = {
    account: {
        username: 'Kevin',
        password: 'Hansen'
    },
    room: undefined,
    status: STATUS_INSTRUCTOR.NOTLOGGEDIN,
    participants: [],
    question: '',
    choices: [
        {
            id: 1,
            text: '',
            answer: true,
            placeholder: 'Required'
        },
        {
            id: 2,
            text: '',
            answer: false,
            placeholder: '(Optional)'
        },
        {
            id: 3,
            text: '',
            answer: false,
            placeholder: '(Optional)'
        },
        {
            id: 4,
            text: '',
            answer: false,
            placeholder: '(Optional)'
        }
    ]
}

export const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        updateAccount: (state, action: PayloadAction<Account>) => {
            state.account = action.payload
        },
        updateRoom: (state, action: PayloadAction<number>) => {
            state.room = action.payload
        },
        updateParticipants: (state, action: PayloadAction<string>) => {
            state.participants.push(action.payload)
        },
        updateStatus: (state, action: PayloadAction<STATUS_INSTRUCTOR>) => {
            state.status = action.payload
        },
        updateChoices: (state, action: PayloadAction<Choice[]>) => {
            state.choices = action.payload
        },
        updateQuestion: (state, action: PayloadAction<string>) => {
            state.question = action.payload
        }
    }
})

// REDUCER
export const {
    updateAccount,
    updateRoom,
    updateParticipants,
    updateStatus,
    updateChoices,
    updateQuestion
} = instructorSlice.actions
export default instructorSlice.reducer

// SELECTOR
export const getStatus = (state: RootState) => state.instructor.status
export const getAccount = (state: RootState) => state.instructor.account
export const getChoices = (state: RootState) => state.instructor.choices
export const getQuestion = (state: RootState) => state.instructor.question

interface loginCreds {
    username: string,
    room: string
}

// DISPATCHER
export const openSocketConnection = (loginCreds: loginCreds) : AppThunk => (dispatch, socket) => {
    socket.connect()
    socket.emit('REGISTERED', {
        username: loginCreds.username,
        room: loginCreds.room
    })

    socket.on('connect', () => {
        console.log('[Instructor] cClient connection has been established')
    })
    socket.on('UPDATE_SCOREBOARD', (score: any) => {
        console.log('UPDATE_SCOREBOARD')
        console.log(score)
    })
    socket.on('STUDENT_JOIN', (username: string) => {
        console.log('STUDENT_JOIN')
        dispatch(updateParticipants(username))
    })
}

export const beginSocketSession = (): AppThunk => (dispatch, socket) => {
    socket.emit('START_SESSION', () => {
        dispatch(updateStatus(STATUS_INSTRUCTOR.PRE))
    })
}

export const postQuestion = (): AppThunk => (dispatch, socket, getState) => {
    const choices = getState().instructor.choices
    const question = getState().instructor.question

    socket.emit('POST_QUESTION', question, choices, () => {
        dispatch(updateStatus(STATUS_INSTRUCTOR.POST))
    })
}
