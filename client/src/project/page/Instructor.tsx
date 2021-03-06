import React, { useState } from 'react'
import Application from '../component/Instructor/Application'
import Portal from '../component/Instructor/Portal'
import InstructorLayout from '../layout/InstructorLayout'
import { STATUS_INSTRUCTOR } from '../util/Enum'

const Instructor = () => {
    const [status, setStatus] = useState(STATUS_INSTRUCTOR.NOTLOGGEDIN)

    const changeStatus = (status: STATUS_INSTRUCTOR) => {
        setStatus(status)
    }

    const isLoggedIn = status !== STATUS_INSTRUCTOR.NOTLOGGEDIN

    return <InstructorLayout title="Instructor" loggedIn={isLoggedIn} status={status} changeStatus={changeStatus}>
        {
            isLoggedIn ? <Application status={status} changeStatus={changeStatus}/> : <Portal/>
        }
    </InstructorLayout>
}

export default Instructor
