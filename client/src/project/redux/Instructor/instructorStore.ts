import { configureStore, Action } from '@reduxjs/toolkit'
import instructorReducer from './instructorSlice'
import { createSocketMiddleware } from '../middleware'
import io, { Socket } from 'socket.io-client'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { Dispatch } from 'react'

export const InstructorStore = () => {
    const socket = io('http://localhost:3001/instructor', {
        autoConnect: false
    })
    const apiMiddleware = createSocketMiddleware(socket)
    return configureStore({
        reducer: {
            instructor: instructorReducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(apiMiddleware)
    })
}

export type RootState = ReturnType<ReturnType<typeof InstructorStore>['getState']>
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
