import React, { FC } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const Portal: FC = () => {
    return <div className='px-5 h-100 flex-column flex-center align-items-start'>
        <div className='text-left font-weight-bold mb-2' style={{ fontSize: 28 }}>
            Instructor ID
        </div>
        <InputGroup size="lg" className={'mb-3'}>
            <FormControl aria-label="Large" />
        </InputGroup>
        <div className='text-left font-weight-bold mb-2' style={{ fontSize: 28 }}>
            Passcode
        </div>
        <InputGroup size="lg">
            <FormControl aria-label="Large" type={'password'} />
        </InputGroup>
    </div>
}

export default Portal
