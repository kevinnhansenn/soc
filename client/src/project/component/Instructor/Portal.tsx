import React, { FC } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

interface Prop {
    login: (status: boolean) => void
}

const Portal: FC<Prop> = () => {
    return <div className='w-100'>
        <div className='text-center font-weight-bold mb-2' style={{ fontSize: 30 }}>
            Instructor ID
        </div>
        <InputGroup size="lg">
            <FormControl aria-label="Large" />
        </InputGroup>
        <div className='text-center font-weight-bold mb-2' style={{ fontSize: 30 }}>
            Passcode
        </div>
        <InputGroup size="lg">
            <FormControl aria-label="Large" />
        </InputGroup>
    </div>
}

export default Portal
