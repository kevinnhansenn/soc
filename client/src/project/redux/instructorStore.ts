import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import instructorReducer from './slice/instructor'
import { createSocketMiddleware } from './middleware'
import io from 'socket.io-client'
export const InstructorStore = () => {
    const socket = io('http://localhost:3001/instructor', {
        autoConnect: true
    })
    const apiMiddleware = createSocketMiddleware(socket)
    const middleware = [apiMiddleware, ...getDefaultMiddleware()]
    return configureStore({
        reducer: {
            instructor: instructorReducer
        },
        middleware
    })
}

export type RootState = ReturnType<ReturnType<typeof InstructorStore>['getState']>
export type AppDispatch = ReturnType<typeof InstructorStore>['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
