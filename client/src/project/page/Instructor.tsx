import React, { useState } from 'react'
import Application from '../component/Instructor/Application'
import Portal from '../component/Instructor/Portal'

const height = window.innerHeight
const width = window.innerWidth

const Instructor = () => {
    const [loggedIn, setLoggedIn] = useState(true)

    const login = (status: boolean) => {
        setLoggedIn(status)
    }

    const RenderView = () => {
        if (loggedIn) {
            return <Application login={login} />
        } else {
            return <Portal login={login} />
        }
    }

    return <div style={{ width, height }}>
        <RenderView />
    </div>
}

export default Instructor
