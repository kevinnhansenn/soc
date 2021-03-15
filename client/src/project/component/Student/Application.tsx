import React, { FC } from 'react'
import Questionnaire from './Questionnaire'
import ReactLoading from 'react-loading'
import { STATUS_STUDENT } from '../../util/Enum'
import { useSelector } from 'react-redux'
import { getWaitingStatus } from '../../redux/Student'

interface Prop {
    status: STATUS_STUDENT,
    changeStatus: (status: STATUS_STUDENT) => void
}

const Application: FC<Prop> = (prop) => {
    const waitingStatus = useSelector(getWaitingStatus)
    return (
        <div className='h-100'>
            { prop.status === STATUS_STUDENT.READY || prop.status === STATUS_STUDENT.ANSWERED
                ? (
                    <Questionnaire />
                )
                : (
                    <div className="flex-center flex-column h-100">
                        <ReactLoading
                            type={'bars'}
                            height={60}
                            width={80}
                            color={'#000000'}
                        />
                        <div
                            className="font-weight-bold mt-4"
                            onClick={() => prop.changeStatus(STATUS_STUDENT.READY)}
                        >
                            { waitingStatus }
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Application
