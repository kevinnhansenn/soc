import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from '../index'
import { Manager, Socket } from 'socket.io-client'

export interface Account {
    username: string,
    password: string
}

interface InstructorState {
    account: Account,
    room: number | undefined,
    participants: string[]
}

const initialState: InstructorState = {
    account: {
        username: 'Kevin',
        password: 'Hansen'
    },
    room: undefined,
    participants: []
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
        }
    }
})

export const { updateAccount, updateRoom, updateParticipants } = instructorSlice.actions
export default instructorSlice.reducer

let socket: typeof Socket

interface loginCreds {
    username: string,
    room: string
}

export const openSocketConnection = (loginCreds: loginCreds) : AppThunk => dispatch => {
    const socketManager = new Manager('http://localhost:3001', {
        query: {
            username: loginCreds.username,
            room: loginCreds.room
        }
    })

    socket = socketManager.socket('/instructor')
    socket.on('connect', () => {
        console.log('Client connection established')
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

export const beginSocketSession = (): AppThunk => () => {
    socket.emit('START_SESSION')
}
