import React, { FC, useState, useEffect } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import styled from 'styled-components'
import { STATUS_STUDENT } from '../../util/Enum'
import { useDispatch } from 'react-redux'
import { updateUsername, updateRoom } from '../../redux/Student'

const CenterInput = styled.div`
    width: 100%;
  
    input {
        text-align: center;
    }
`

interface Prop {
    changeStatus: (status: STATUS_STUDENT) => void
}

const Portal: FC<Prop> = () => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateUsername(username))
        dispatch(updateRoom(room))
    }, [username, room])

    return (
        <div className="w-100 h-100 px-5 d-flex align-items-center">
            <CenterInput>
                <small>{ username }</small> - <small>{ room }</small>
                <div
                    className="text-center font-weight-bold mb-2"
                    style={{ fontSize: 30 }}
                >
                    Room ID
                </div>
                <InputGroup size="lg" className='w-100'>
                    <FormControl onChange={e => setRoom(e.target.value)}/>
                </InputGroup>
                <div
                    className="text-center font-weight-bold mb-2 mt-3"
                    style={{ fontSize: 30 }}
                >
                    Your Name
                </div>
                <InputGroup size="lg" className='w-100'>
                    <FormControl onChange={e => setUsername(e.target.value)} />
                </InputGroup>
            </CenterInput>
        </div>
    )
}

export default Portal
