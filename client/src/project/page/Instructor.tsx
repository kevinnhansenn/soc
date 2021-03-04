import React, { useState } from 'react'
import Application from '../component/Instructor/Application'
import Portal from '../component/Instructor/Portal'
import InstructorLayout from '../layout/InstructorLayout'
import { STATUS } from '../util/Enum'

const Instructor = () => {
    const [status, setStatus] = useState(STATUS.NOTLOGGEDIN)

    const changeStatus = (status: STATUS) => {
        setStatus(status)
    }

    const isLoggedIn = status !== STATUS.NOTLOGGEDIN

    return <InstructorLayout title="Instructor" loggedIn={isLoggedIn} status={status} changeStatus={changeStatus}>
        {
            isLoggedIn ? <Application status={status} changeStatus={changeStatus}/> : <Portal/>
        }
    </InstructorLayout>
}

export default Instructor
