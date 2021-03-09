import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Manager } from 'socket.io-client'

export interface Account {
    username: string,
    password: string
}

interface InstructorState {
    account: Account,
    room: number | undefined,
    socket: boolean
}

const initialState: InstructorState = {
    account: {
        username: 'Kevin',
        password: 'Hansen'
    },
    room: undefined,
    socket: false
}

const socketManager = new Manager('http://localhost:3001')

// eslint-disable-next-line no-undef
const socketEvents = (socket: SocketIOClient.Socket) => {
    socket.on('connect', () => {
        console.log('Client connection established')
    })
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
        updateSocket: (state, action: PayloadAction<boolean>) => {
            state.socket = action.payload

            if (state.socket) {
                const socket = socketManager.socket('/instructor')
                socketEvents(socket)
            }
        }
    }
})

export const { updateAccount, updateRoom, updateSocket } = instructorSlice.actions

export default instructorSlice.reducer
