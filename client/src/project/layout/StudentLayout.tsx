import React, { FC, useState } from 'react'
import FadeAnimation from '../animation/FadeAnimation'
import { STATUS_STUDENT } from '../util/Enum'
import axios from 'axios'
import { /* useAppDispatch, */ useAppSelector } from '../redux/hooks'

const height = window.innerHeight
const width = window.innerWidth

axios.defaults.baseURL = 'http://localhost:3001'

interface Props {
    title: string
    status: STATUS_STUDENT
    changeStatus: (status: STATUS_STUDENT) => void
}

const StudentLayout: FC<Props> = (prop) => {
    const [sound, setSound] = useState(false)
    // const dispatch = useAppDispatch()

    const RenderNavbar = () => {
        if (prop.status === STATUS_STUDENT.WAITING) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div>
                    <i
                        className="bi bi-arrow-left-circle-fill"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS_STUDENT.NOTLOGGEDIN)}
                    />
                </div>
                <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                    <span className="text-success">0</span>
                    <span> / 0</span>
                </div>
            </div>
        }

        if (prop.status === STATUS_STUDENT.READY) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div
                    className='text-warning font-weight-bold'
                    style={{ fontSize: 30 }}
                >Not Answered</div>
                <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                    <span className="text-success">0</span>
                    <span> / 0</span>
                </div>
            </div>
        }

        if (prop.status === STATUS_STUDENT.ANSWERED) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div
                    onClick={() => prop.changeStatus(STATUS_STUDENT.WAITING)}
                    className='text-success font-weight-bold'
                    style={{ fontSize: 30 }}
                > Confirmed
                </div>
                <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                    <span className="text-success">0</span>
                    <span> / 0</span>
                </div>
            </div>
        }

        const username = useAppSelector(state => state.student.username)
        const room = useAppSelector(state => state.student.room)

        const studentLogin = async () => {
            const res = await axios.post('studentLogin', { username, room })

            if (res.status === 200) {
                // dispatch(openSocketConnection({ username, room }))
                prop.changeStatus(STATUS_STUDENT.WAITING)
            } else {
                // Show error message
            }
        }

        return <div className="d-flex align-items-center justify-content-end px-3 py-2">
            <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                <i
                    className="bi bi-arrow-right-circle-fill"
                    style={{ fontSize: 50 }}
                    onClick={studentLogin}
                />
            </div>
        </div>
    }

    return <div className="d-flex flex-column" style={{ width, height }}>
        <div className="d-flex align-items-center justify-content-between px-3 py-2">
            <div
                className="d-flex align-items-center font-weight-bold"
                style={{ fontSize: 36 }}
            >
                {prop.title}
            </div>
            {
                sound
                    ? <i className="bi bi-volume-up" onClick={() => setSound(!sound)} style={{ fontSize: 38 }} />
                    : <i className="bi bi-volume-mute" onClick={() => setSound(!sound)} style={{ fontSize: 38 }} />
            }
        </div>
        <div className="w-100 flex-grow-1 flex-center">
            <FadeAnimation cssKey={prop.status}>
                {prop.children}
            </FadeAnimation>
        </div>
        <RenderNavbar />
    </div>
}

export default StudentLayout
