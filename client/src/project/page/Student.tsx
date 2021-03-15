import React from 'react'
import StudentLayout from '../layout/StudentLayout'
import Application from '../component/Student/Application'
import Portal from '../component/Student/Portal'
import { STATUS_STUDENT } from '../util/Enum'
import { useDispatch, useSelector } from 'react-redux'
import { getStatus, updateStatus } from '../redux/Student'

const Student = () => {
    const status = useSelector(getStatus)
    const dispatch = useDispatch()

    const changeStatus = (status: STATUS_STUDENT) => {
        dispatch(updateStatus(status))
    }

    return (<StudentLayout title="Student" status={status} changeStatus={changeStatus}>
        {
            status ? <Application status={status} changeStatus={changeStatus} /> : <Portal changeStatus={changeStatus} />
        }
    </StudentLayout>
    )
}

export default Student
