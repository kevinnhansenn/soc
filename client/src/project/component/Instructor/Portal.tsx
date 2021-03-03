import React, { FC } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const Portal: FC = () => {
    return <div className='w-100'>
        <div className='text-left font-weight-bold mb-2' style={{ fontSize: 28 }}>
            Instructor ID
        </div>
        <InputGroup size="lg" className={'mb-4'}>
            <FormControl aria-label="Large" />
        </InputGroup>
        <div className='text-left font-weight-bold mb-2' style={{ fontSize: 28 }}>
            Passcode
        </div>
        <InputGroup size="lg">
            <FormControl aria-label="Large" type={'password'}/>
        </InputGroup>
    </div>
}

export default Portal
