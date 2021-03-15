import React, { FC, useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useDispatch } from 'react-redux'
import { updateAccount } from '../../redux/Instructor'

const Portal: FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(updateAccount({ username, password }))
    }, [username, password])

    return <div className='px-5 h-100 flex-column flex-center align-items-start'>
        <small>{ username }</small>
        <small>{ password }</small>
        <div className='text-left font-weight-bold mb-2' style={{ fontSize: 28 }}>
            Instructor ID
        </div>
        <InputGroup size="lg" className={'mb-3'}>
            <FormControl aria-label="Large" onChange={e => setUsername(e.target.value)} />
        </InputGroup>
        <div className='text-left font-weight-bold mb-2' style={{ fontSize: 28 }}>
            Passcode
        </div>
        <InputGroup size="lg">
            <FormControl aria-label="Large" type={'password'} onChange={e => setPassword(e.target.value)} />
        </InputGroup>
    </div>
}

export default Portal
