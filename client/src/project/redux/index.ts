import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import instructorReducer from './slice/instructor'
import studentReducer from './slice/student'
import { Socket } from 'socket.io-client'
import { createSocketMiddleware } from './middleware'

export const store = (socket: typeof Socket) => {
    const apiMiddleware = createSocketMiddleware(socket)
    const middleware = [apiMiddleware, ...getDefaultMiddleware()]
    return configureStore({
        reducer: {
            instructor: instructorReducer,
            student: studentReducer
        },
        middleware
    })
}

// Scoober game

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
