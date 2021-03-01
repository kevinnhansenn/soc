import React, { FunctionComponent, useState } from 'react'
import Questionnaire from './Questionnaire'
import ReactLoading from 'react-loading'

const Application: FunctionComponent = () => {
    const [ready, setReady] = useState(false)

    const changeReady = (status: boolean) => {
        setReady(status)
    }

    return (
        <div>
            {ready
                ? (
                    <Questionnaire changeReady={changeReady} />
                )
                : (
                    <div className="d-flex flex-column align-items-center">
                        <ReactLoading
                            type={'bars'}
                            height={60}
                            width={80}
                            color={'#000000'}
                        />
                        <div
                            className="font-weight-bold mt-4"
                            onClick={() => changeReady(true)}
                        >
                        Waiting for Instructor...
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Application
