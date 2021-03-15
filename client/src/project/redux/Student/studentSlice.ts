import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from './studentStore'
// import { Manager } from 'socket.io-client'
import { STATUS_STUDENT } from '../../util/Enum'
import { Choice } from '../Instructor'

interface Question {
    question: string,
    choices: Choice[]
}

interface StudentState {
    username: string,
    room: string,
    status: STATUS_STUDENT,
    waitingStatus: 'Waiting other students to join...' | 'Instructor is making the question...',
    question: Question | null
}

const initialState: StudentState = {
    username: '',
    room: '',
    status: STATUS_STUDENT.NOTLOGGEDIN,
    waitingStatus: 'Waiting other students to join...',
    question: null
}

export const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        updateRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload
        },
        updateStatus: (state, action: PayloadAction<STATUS_STUDENT>) => {
            state.status = action.payload
        },
        updateWaitingStatus: (state, action: PayloadAction<StudentState['waitingStatus']>) => {
            state.waitingStatus = action.payload
        },
        updateQuestion: (state, action: PayloadAction<Question>) => {
            state.question = action.payload
        }
    }
})

// REDUCER
export const {
    updateUsername,
    updateRoom,
    updateStatus,
    updateWaitingStatus,
    updateQuestion
} = studentSlice.actions
export default studentSlice.reducer

// SELECTOR
export const getUsername = (state: RootState) => state.student.username
export const getRoom = (state: RootState) => state.student.room
export const getStatus = (state: RootState) => state.student.status
export const getWaitingStatus = (state: RootState) => state.student.waitingStatus
export const getQuestion = (state: RootState) => state.student.question

interface LoginCreds {
    username: string,
    room: string
}

// DISPATCHER
export const openSocketConnection = (loginCreds: LoginCreds) : AppThunk => (dispatch, socket) => {
    socket.connect()
    socket.emit('REGISTERED', {
        username: loginCreds.username,
        room: loginCreds.room
    })
    socket.on('UPDATE_SCOREBOARD', (score: any) => {
        console.log('UPDATE_SCOREBOARD')
        console.log(score)
    })
    socket.on('SESSION_HAS_STARTED', () => {
        console.log('SESSION_HAS_STARTED')
        dispatch(updateWaitingStatus('Instructor is making the question...'))
    })
    socket.on('QUESTION_HAS_BEEN_POSTED', (question: Question) => {
        console.log('QUESTION_HAS_BEEN_POSTED')
        console.log(question)
        dispatch(updateQuestion(question))
        dispatch(updateStatus(STATUS_STUDENT.READY))
    })
    socket.on('SESSION_HAS_ENDED', () => {
        console.log('SESSION_HAS_ENDED')
    })
}
