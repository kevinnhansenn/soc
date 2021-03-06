import React, { useState } from 'react'
import StudentLayout from '../layout/StudentLayout'
import Application from '../component/Student/Application'
import Portal from '../component/Student/Portal'
import { STATUS_STUDENT } from '../util/Enum'

const Student = () => {
    const [status, setStatus] = useState(STATUS_STUDENT.NOTLOGGEDIN)

    const changeStatus = (status: STATUS_STUDENT) => {
        setStatus(status)
    }

    return (
        <StudentLayout title="Student" status={status} changeStatus={changeStatus}>
            {
                status ? <Application status={status} changeStatus={changeStatus} /> : <Portal changeStatus={changeStatus} />
            }
        </StudentLayout>
    )
}

export default Student
