import React from 'react'
import Application from '../component/Instructor/Application'
import Portal from '../component/Instructor/Portal'
import InstructorLayout from '../layout/InstructorLayout'
import { STATUS_INSTRUCTOR } from '../util/Enum'
import { useDispatch, useSelector } from 'react-redux'
import { getAccount, getStatus, updateStatus } from '../redux/Instructor'

const Instructor = () => {
    const status = useSelector(getStatus)
    const account = useSelector(getAccount)

    const dispatch = useDispatch()

    const changeStatus = (status: STATUS_INSTRUCTOR) => {
        dispatch(updateStatus(status))
    }

    const isLoggedIn = status !== STATUS_INSTRUCTOR.NOTLOGGEDIN

    return <InstructorLayout title={ account.username || 'Instructor'} loggedIn={isLoggedIn} status={status}
        changeStatus={changeStatus}>
        {
            isLoggedIn ? <Application status={status} changeStatus={changeStatus}/> : <Portal/>
        }
    </InstructorLayout>
}

export default Instructor
