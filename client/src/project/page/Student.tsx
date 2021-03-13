import React, { useMemo, useState } from 'react'
import StudentLayout from '../layout/StudentLayout'
import Application from '../component/Student/Application'
import Portal from '../component/Student/Portal'
import { STATUS_STUDENT } from '../util/Enum'
import { Provider } from 'react-redux'
import { StudentStore } from '../redux/studentStore'

let store: ReturnType<typeof StudentStore>

const Student = () => {
    useMemo(() => {
        store = StudentStore()
    }, [store])

    const [status, setStatus] = useState(STATUS_STUDENT.NOTLOGGEDIN)

    const changeStatus = (status: STATUS_STUDENT) => {
        setStatus(status)
    }

    return (
        <Provider store={store}>
            <StudentLayout title="Student" status={status} changeStatus={changeStatus}>
                {
                    status ? <Application status={status} changeStatus={changeStatus} /> : <Portal changeStatus={changeStatus} />
                }
            </StudentLayout>
        </Provider>
    )
}

export default Student
