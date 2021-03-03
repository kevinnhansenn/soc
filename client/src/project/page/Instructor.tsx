import React, { useState } from 'react'
import Application from '../component/Instructor/Application'
import Portal from '../component/Instructor/Portal'
import InstructorLayout from '../layout/InstructorLayout'

const Instructor = () => {
    const [loggedIn, setLoggedIn] = useState(false)

    const login = (status: boolean) => {
        setLoggedIn(status)
    }

    return <InstructorLayout title="Instructor" loggedIn={loggedIn} login={login}>
        {
            loggedIn ? <Application /> : <Portal />
        }
    </InstructorLayout>
}

export default Instructor
