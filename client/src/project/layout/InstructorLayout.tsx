import React, { FC } from 'react'
import SlidingAnimation from '../animation/SlidingAnimation'
import { STATUS } from '../util/Enum'

const height = window.innerHeight
const width = window.innerWidth

interface Props {
    title: string
    loggedIn: boolean
    status: STATUS
    changeStatus: (status: STATUS) => void
}

const InstructorLayout: FC<Props> = (prop) => {
    const RenderNavbar = () => {
        if (prop.status === STATUS.WAITING) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div>
                    <i
                        className="bi bi-arrow-left-circle-fill"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS.NOTLOGGEDIN)}
                    />
                </div>
                <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                    <span className="text-info">0</span>
                </div>
                <div>
                    <i
                        className="bi bi-box-arrow-in-right"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS.PRE)}
                    />
                </div>
            </div>
        }

        if (prop.status === STATUS.PRE) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div>
                    <i
                        className="bi bi-arrow-left-circle-fill"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS.WAITING)}
                    />
                </div>
                <div>
                    <i
                        className="bi bi-check-circle"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS.POST)}
                    />
                </div>
            </div>
        }

        if (prop.status === STATUS.POST) {
            return <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div>
                    <i
                        className="bi bi-arrow-left-circle-fill"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS.PRE)}
                    />
                </div>
                <div>
                    <i
                        className="bi bi-check-circle"
                        style={{ fontSize: 50 }}
                        onClick={() => prop.changeStatus(STATUS.PRE)}
                    />
                </div>
            </div>
        }

        return <div className="d-flex align-items-center justify-content-end px-3 py-2">
            <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                <i
                    className="bi bi-arrow-right-circle-fill"
                    style={{ fontSize: 50 }}
                    onClick={() => prop.changeStatus(STATUS.WAITING)}
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
            <i className="bi bi-volume-up" style={{ fontSize: 38 }} />
        </div>
        <div className={'w-100 overflow-auto flex-grow-1 d-flex'}>
            <SlidingAnimation cssKey={prop.loggedIn ? '1' : '0'}>
                {prop.children}
            </SlidingAnimation>
        </div>
        <RenderNavbar />
    </div>
}

export default InstructorLayout
