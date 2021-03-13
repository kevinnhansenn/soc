import React, { useMemo, useState } from 'react'
import Application from '../component/Instructor/Application'
import Portal from '../component/Instructor/Portal'
import InstructorLayout from '../layout/InstructorLayout'
import { STATUS_INSTRUCTOR } from '../util/Enum'
import { Provider } from 'react-redux'
import { InstructorStore } from '../redux/instructorStore'

let store: ReturnType<typeof InstructorStore>

const Instructor = () => {
    // Memoized the store
    useMemo(() => {
        store = InstructorStore()
    }, [store])

    const [status, setStatus] = useState(STATUS_INSTRUCTOR.NOTLOGGEDIN)

    const changeStatus = (status: STATUS_INSTRUCTOR) => {
        setStatus(status)
    }

    const isLoggedIn = status !== STATUS_INSTRUCTOR.NOTLOGGEDIN

    return <Provider store={store}>
        <InstructorLayout title="Instructor" loggedIn={isLoggedIn} status={status}
            changeStatus={changeStatus}>
            {
                isLoggedIn ? <Application status={status} changeStatus={changeStatus}/> : <Portal/>
            }
        </InstructorLayout>
    </Provider>
}

export default Instructor
