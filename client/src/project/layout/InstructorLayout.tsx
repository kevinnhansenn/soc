import React, { FC, useState } from 'react'
import FadeAnimation from '../animation/FadeAnimation'
import { STATUS_INSTRUCTOR } from '../util/Enum'
import axios from 'axios'

import { beginSocketSession, getAccount, openSocketConnection, postQuestion, updateRoom } from '../redux/Instructor'
import { useDispatch, useSelector } from 'react-redux'

axios.defaults.baseURL = 'http://localhost:3001'

const height = window.innerHeight
const width = window.innerWidth

interface Props {
    title: string
    loggedIn: boolean
    status: STATUS_INSTRUCTOR
    changeStatus: (status: STATUS_INSTRUCTOR) => void
}

const InstructorLayout: FC<Props> = (prop) => {
    const [sound, setSound] = useState(false)
    const account = useSelector(getAccount)
    const dispatch = useDispatch()

    const instructorLogin = async () => {
        const res = await axios.post('instructorLogin', account)
        if (res.status === 200) {
            dispatch(updateRoom(res.data.room))
            dispatch(openSocketConnection({
                username: account.username,
                room: res.data.room
            }))
            prop.changeStatus(STATUS_INSTRUCTOR.WAITING)
        } else {
            // Show error message
        }
    }

    const RenderNavbar = () => {
        if (prop.status === STATUS_INSTRUCTOR.WAITING) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div>
                    <i
                        className="bi bi-box-arrow-left"
                        style={{ fontSize: 48 }}
                        onClick={() => prop.changeStatus(STATUS_INSTRUCTOR.NOTLOGGEDIN)}
                    />
                </div>
                <div className="font-weight-bold" style={{ fontSize: 40 }}>
                    <span>0</span>
                </div>
                <div>
                    <i
                        className="bi bi-box-arrow-in-right"
                        style={{ fontSize: 50 }}
                        onClick={() => dispatch(beginSocketSession())}
                    />
                </div>
            </div>
        }

        if (prop.status === STATUS_INSTRUCTOR.PRE) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div>
                    <i
                        className="bi bi-arrow-left-circle-fill"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS_INSTRUCTOR.WAITING)}
                    />
                </div>
                <div>
                    <i
                        className="bi bi-check-circle"
                        style={{ fontSize: 50 }}
                        onClick={() => dispatch(postQuestion())}
                    />
                </div>
            </div>
        }

        if (prop.status === STATUS_INSTRUCTOR.POST) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div>
                    <i
                        className="bi bi-arrow-left-circle-fill"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS_INSTRUCTOR.PRE)}
                    />
                </div>
                <div>
                    <i
                        className="bi bi-check-circle"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS_INSTRUCTOR.PRE)}
                    />
                </div>
            </div>
        }

        return <div className="d-flex align-items-center justify-content-end px-3 py-2">
            <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                <i
                    className="bi bi-arrow-right-circle-fill"
                    style={{ fontSize: 50 }}
                    onClick={instructorLogin}
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
        <div className={'w-100 overflow-auto flex-grow-1 d-flex'}>
            <FadeAnimation cssKey={prop.loggedIn ? '1' : '0'}>
                {prop.children}
            </FadeAnimation>
        </div>
        <RenderNavbar />
    </div>
}

export default InstructorLayout
