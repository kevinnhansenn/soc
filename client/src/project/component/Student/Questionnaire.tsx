import React, { FC } from 'react'

interface Prop {
    changeReady: (status: boolean) => void
}

const qBank = ['Amsterdam', 'Kiev', 'Paris', 'Moscow']
const deadCenter = 'd-flex align-items-center justify-content-center'

const Questionnaire: FC<Prop> = (prop) => {
    return (
        <div className="h-100">
            <div className={`${deadCenter} h-25 pb-3`} style={{ fontSize: 32 }}>
                What is the capital city of Holland?
            </div>
            <div className="d-flex h-75" style={{ flexWrap: 'wrap' }}>
                {qBank.map((question, index) => (
                    <div
                        key={index}
                        style={{
                            fontSize: 24
                        }}
                        className={`${deadCenter} btn btn-info border text-white h-50 w-50 `}
                    >
                        {question}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Questionnaire
