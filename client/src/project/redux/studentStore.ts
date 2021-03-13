import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import studentReducer from './slice/student'
import io from 'socket.io-client'
import { createSocketMiddleware } from './middleware'

export const StudentStore = () => {
    const socket = io('http://localhost:3001/student', {
        autoConnect: true
    })
    const apiMiddleware = createSocketMiddleware(socket)
    const middleware = [apiMiddleware, ...getDefaultMiddleware()]
    return configureStore({
        reducer: {
            student: studentReducer
        },
        middleware
    })
}

export type RootState = ReturnType<ReturnType<typeof StudentStore>['getState']>
export type AppDispatch = ReturnType<typeof StudentStore>['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
