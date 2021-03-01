import React, { FC } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components'

const CenterInput = styled.div`
    input {
        text-align: center;
    }
`

interface Prop {
    login: (status: boolean) => void
}

const Portal: FC<Prop> = (prop) => {
    const submit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            prop.login(true)
        }
    }

    return (
        <div className="w-100 px-5">
            <div
                className="text-center font-weight-bold mb-2"
                style={{ fontSize: 30 }}
            >
                Room ID
            </div>
            <CenterInput>
                <InputGroup size="lg">
                    <FormControl onKeyPress={submit} />
                </InputGroup>
            </CenterInput>
        </div>
    )
}

export default Portal
