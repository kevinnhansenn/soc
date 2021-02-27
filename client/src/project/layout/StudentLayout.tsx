import React, { FunctionComponent } from 'react'
import SlidingAnimation from '../animation/SlidingAnimation'

const height = window.innerHeight
const width = window.innerWidth

interface Props {
  title: string
  loggedIn: boolean
  login: (status: boolean) => void
}

const StudentLayout: FunctionComponent<Props> = (prop) => (
    <div className="d-flex flex-column student" style={{ width, height }}>
        <div className="d-flex align-items-center justify-content-between px-3 py-2">
            <div
                className="d-flex align-items-center font-weight-bold"
                style={{ fontSize: 36 }}
            >
                {prop.title}
            </div>
            <i className="bi bi-volume-up" style={{ fontSize: 38 }} />
        </div>
        <div className="w-100 flex-grow-1 d-flex align-items-center justify-content-center">
            <SlidingAnimation cssKey={prop.loggedIn ? '1' : '0'}>
                {prop.children}
            </SlidingAnimation>
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
                    <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
                        <span className="text-success">0</span>
                        <span> / 0</span>
                    </div>
                </div>
            )
            : (
                <div className="d-flex align-items-center justify-content-end px-3 py-2">
                    <div className="font-weight-bold mt-2" style={{ fontSize: 40 }}>
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

export default StudentLayout
