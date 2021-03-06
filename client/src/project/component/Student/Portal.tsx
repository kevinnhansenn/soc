import React, { FC } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components'
import { STATUS_STUDENT } from '../../util/Enum'

const CenterInput = styled.div`
    width: 100%;
  
    input {
        text-align: center;
    }
`

interface Prop {
    changeStatus: (status: STATUS_STUDENT) => void
}

const Portal: FC<Prop> = (prop) => {
    const submit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            prop.changeStatus(STATUS_STUDENT.WAITING)
        }
    }

    return (
        <div className="w-100 h-100 px-5 d-flex align-items-center">
            <CenterInput>
                <div
                    className="text-center font-weight-bold mb-2"
                    style={{ fontSize: 30 }}
                >
                    Room ID
                </div>
                <InputGroup size="lg" className='w-100'>
                    <FormControl onKeyPress={submit} />
                </InputGroup>
            </CenterInput>
        </div>
    )
}

export default Portal
