import { Socket } from 'socket.io-client'

export const createSocketMiddleware = (socket: typeof Socket) => ({
    dispatch,
    getState
}: any) => (next: any) => (action: any) => {
    if (typeof action === 'function') {
        action(dispatch, socket, getState)
    } else {
        return next(action)
    }
}
