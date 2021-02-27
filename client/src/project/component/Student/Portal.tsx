import React, { FC } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const Portal: FC = () => {
    return <div className='w-100'>
        <div className='text-center font-weight-bold mb-2' style={{ fontSize: 30 }}>
            Room ID
        </div>
        <InputGroup size="lg">
            <FormControl aria-label="Large" />
        </InputGroup>
    </div>
}

export default Portal
