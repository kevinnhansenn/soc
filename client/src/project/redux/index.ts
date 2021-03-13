import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import instructorReducer from './slice/instructor'
import studentReducer from './slice/student'
import { Socket } from 'socket.io-client'
import { createSocketMiddleware } from './middleware'

export const store = configureStore({
    reducer: {
        instructor: instructorReducer,
        student: studentReducer
    }
})

export const _store = (socket: typeof Socket) => {
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

export type RootState = ReturnType<ReturnType<typeof _store>['getState']>
export type AppDispatch = ReturnType<typeof _store>['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
