import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from './studentStore'
import { STATUS_STUDENT } from '../../util/Enum'
import { Choice } from '../Instructor'

interface QuestionSet {
    id: string,
    question: string,
    choices: Choice[]
}

type ResultInfo = 'IDLE' | 'CORRECT' | 'WRONG'

interface StudentState {
    username: string,
    room: string,
    status: STATUS_STUDENT,
    waitingStatus: 'Waiting other students to join...' | 'Instructor is making the question...',
    question: QuestionSet | null,
    currentAnswer: Choice | null,
    result: boolean[],
    resultInfo: ResultInfo
}

const initialState: StudentState = {
    username: '',
    room: '',
    status: STATUS_STUDENT.NOTLOGGEDIN,
    waitingStatus: 'Waiting other students to join...',
    question: null,
    currentAnswer: null,
    result: [],
    resultInfo: 'IDLE'
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
        },
        updateStatus: (state, action: PayloadAction<STATUS_STUDENT>) => {
            state.status = action.payload
        },
        updateWaitingStatus: (state, action: PayloadAction<StudentState['waitingStatus']>) => {
            state.waitingStatus = action.payload
        },
        updateQuestion: (state, action: PayloadAction<QuestionSet>) => {
            state.question = action.payload
        },
        updateCurrentAnswer: (state, action: PayloadAction<Choice>) => {
            state.currentAnswer = action.payload
        },
        updateResult: (state, action: PayloadAction<boolean>) => {
            state.result.push(action.payload)
        },
        updateResultInfo: (state, action: PayloadAction<ResultInfo>) => {
            state.resultInfo = action.payload
        },
        resetQuestion: state => {
            state.question = null
        },
        resetCurrentAnswer: state => {
            state.currentAnswer = null
        },
        resetResultInfo: state => {
            state.resultInfo = 'IDLE'
        }
    }
})

// REDUCER
export const {
    updateUsername,
    updateRoom,
    updateStatus,
    updateWaitingStatus,
    updateQuestion,
    updateCurrentAnswer,
    updateResult,
    updateResultInfo,
    resetQuestion,
    resetCurrentAnswer,
    resetResultInfo
} = studentSlice.actions
export default studentSlice.reducer

// SELECTOR
export const getUsername = (state: RootState) => state.student.username
export const getResult = (state: RootState) => state.student.result
export const getStatus = (state: RootState) => state.student.status
export const getWaitingStatus = (state: RootState) => state.student.waitingStatus
export const getQuestion = (state: RootState) => state.student.question
export const getResultInfo = (state: RootState) => state.student.resultInfo
export const getCurrentAnswer = (state: RootState) => state.student.currentAnswer

interface LoginCreds {
    username: string,
    room: string
}

// DISPATCHER
export const openSocketConnection = (loginCreds: LoginCreds) : AppThunk => (dispatch, socket, getState) => {
    socket.connect()
    socket.emit('REGISTERED', {
        username: loginCreds.username,
        room: loginCreds.room
    })
    socket.on('UPDATE_SCOREBOARD', (score: any) => {
        console.log(score)
    })
    socket.on('SESSION_HAS_STARTED', () => {
        dispatch(updateWaitingStatus('Instructor is making the question...'))
    })
    socket.on('QUESTION_HAS_BEEN_POSTED', (question: QuestionSet) => {
        dispatch(updateQuestion(question))
        dispatch(updateStatus(STATUS_STUDENT.READY))
    })
    socket.on('SESSION_HAS_ENDED', () => {
        const result = !!getState().student.currentAnswer?.answer
        dispatch(updateResultInfo(result ? 'CORRECT' : 'WRONG'))

        // Delay 7 second
        setTimeout(() => {
            dispatch(updateStatus(STATUS_STUDENT.WAITING))
            setTimeout(() => {
                dispatch(resetQuestion())
                dispatch(updateResult(result))
                dispatch(resetCurrentAnswer())
                dispatch(resetResultInfo())
            })
        }, 10000)
    })
}

export const answerQuestion = (questionId: string, choice: Choice) : AppThunk => (dispatch, socket, getState) => {
    if (getState().student.status !== STATUS_STUDENT.READY) return
    dispatch(updateCurrentAnswer(choice))
    dispatch(updateStatus(STATUS_STUDENT.ANSWERED))
    socket.emit('ANSWER_THE_QUESTION', choice)
}
