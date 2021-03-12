import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { Manager } from 'socket.io-client'

interface InstructorState {
    username: string,
    room: string
}

const initialState: InstructorState = {
    username: '',
    room: ''
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
        }
    }
})

export const { updateUsername, updateRoom } = studentSlice.actions
export default studentSlice.reducer

interface LoginCreds {
    username: string,
    room: string
}

// @typescript-eslint/no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const openSocketConnection = (loginCreds: LoginCreds) : AppThunk => dispatch => {
    const socketManager = new Manager('http://localhost:3001', {
        query: {
            username: loginCreds.username,
            room: loginCreds.room
        }
    })

    const socket = socketManager.socket('/student')
    socket.on('connect', () => {
        console.log('Student client connection established')
    })

    socket.on('UPDATE_SCOREBOARD', (score: any) => {
        console.log('UPDATE_SCOREBOARD')
        console.log(score)
    })
    socket.on('SESSION_HAS_STARTED', () => {
        console.log('SESSION_HAS_STARTED')
    })
    socket.on('SESSION_HAS_ENDED', () => {
        console.log('SESSION_HAS_ENDED')
    })
    socket.on('QUESTION_HAS_BEEN_POSTED', (question: any) => {
        console.log('QUESTION_HAS_BEEN_POSTED')
        console.log(question)
    })
}
