import React, { useState } from 'react'
import StudentLayout from '../layout/StudentLayout'
import Application from '../component/Application'
import Portal from '../component/Portal'

const Student = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    const login = (status: boolean) => {
        setLoggedIn(status)
    }

    return (
        <StudentLayout title="Socket.io" loggedIn={loggedIn} login={login}>
            {
                loggedIn ? <Application /> : <Portal />
            }
        </StudentLayout>
    )
}

export default Student
