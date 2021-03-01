import React, { useState } from 'react'
import StudentLayout from '../layout/StudentLayout'
import Application from '../component/Student/Application'
import Portal from '../component/Student/Portal'

const Student = () => {
    const [loggedIn, setLoggedIn] = useState(true)

    const login = (status: boolean) => {
        setLoggedIn(status)
    }

    return (
        <StudentLayout title="Socket.io" loggedIn={loggedIn} login={login}>
            {loggedIn ? <Application /> : <Portal login={login} />}
        </StudentLayout>
    )
}

export default Student
