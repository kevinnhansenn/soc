import React, { FC } from 'react'
import { STATUS_STUDENT } from '../../util/Enum'

interface Prop {
    changeStatus: (status: STATUS_STUDENT) => void
}

const qBank = ['Amsterdam', 'Kiev', 'Paris', 'Moscow']

const Questionnaire: FC<Prop> = (prop) => {
    const selectChoice = () => {
        prop.changeStatus(STATUS_STUDENT.ANSWERED)
    }

    return (
        <div className="h-100">
            <div className={'flex-center h-25 pb-3'} style={{ fontSize: 32 }}>
                What is the capital city of Holland?
            </div>
            <div className="d-flex h-75" style={{ flexWrap: 'wrap' }}>
                {qBank.map((question, index) => (
                    <div
                        key={index}
                        onClick={selectChoice}
                        style={{
                            fontSize: 24
                        }}
                        className={'flex-center btn btn-info border text-white h-50 w-50 '}
                    >
                        {question}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Questionnaire
