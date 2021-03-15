import { configureStore, Action } from '@reduxjs/toolkit'
import studentReducer from './studentSlice'
import io, { Socket } from 'socket.io-client'
import { createSocketMiddleware } from '../middleware'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { Dispatch } from 'react'

export const StudentStore = () => {
    const socket = io('http://localhost:3001/student', {
        autoConnect: false
    })
    const apiMiddleware = createSocketMiddleware(socket)
    return configureStore({
        reducer: {
            student: studentReducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(apiMiddleware)
    })
}

export type RootState = ReturnType<ReturnType<typeof StudentStore>['getState']>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type ModifiedThunkAction<R, S, E, A extends Action> = (
    dispatch: Dispatch<A>,
    socket: typeof Socket,
    getState: () => S,
    extraArgument: E
) => R;

export type AppThunk<ReturnType = void> = ModifiedThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
