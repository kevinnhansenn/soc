import React, { FunctionComponent, useState } from 'react'
import FadingAnimation from '../animation/FadingAnimation'

const height = window.innerHeight
const width = window.innerWidth

interface Props {
    title: string
    loggedIn: boolean
    login: (status: boolean) => void
}

const StudentLayout: FunctionComponent<Props> = (prop) => {
    const [mute, setMute] = useState(false)

    const toggleMute = () => {
        setMute(!mute)
    }
    return (
        <div className="d-flex flex-column student" style={{ width, height }}>
            <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div
                    className="d-flex align-items-center font-weight-bold"
                    style={{ fontSize: 36 }}
                >
                    {prop.title}
                </div>
                {mute
                    ? (
                        <i
                            className="bi bi-volume-mute"
                            style={{ fontSize: 38 }}
                            onClick={toggleMute}
                        />
                    )
                    : (
                        <i
                            className="bi bi-volume-up"
                            style={{ fontSize: 38 }}
                            onClick={toggleMute}
                        />
                    )}
            </div>
            <div className="w-100 flex-grow-1 d-flex justify-content-center overflow-hidden vh-100">
                <FadingAnimation cssKey={prop.loggedIn ? '1' : '0'}>
                    {prop.children}
                </FadingAnimation>
            </div>
            {prop.loggedIn
                ? (
                    <div className="d-flex align-items-center justify-content-between px-3 py-2">
                        <div>
                            <i
                                className="bi bi-arrow-left-circle-fill"
                                style={{ fontSize: 50 }}
                                onClick={() => prop.login(false)}
                            />
                        </div>
                        <div
                            className="font-weight-bold mt-2"
                            style={{ fontSize: 40 }}
                        >
                            <span className="text-info">0</span>
                            <span> / 0</span>
                        </div>
                    </div>
                )
                : (
                    <div className="d-flex align-items-center justify-content-end px-3 py-2">
                        <div
                            className="font-weight-bold mt-2"
                            style={{ fontSize: 40 }}
                        >
                            <i
                                className="bi bi-arrow-right-circle-fill"
                                style={{ fontSize: 50 }}
                                onClick={() => prop.login(true)}
                            />
                        </div>
                    </div>
                )}
        </div>
    )
}

export default StudentLayout
