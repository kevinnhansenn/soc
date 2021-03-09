import React, { useEffect, useState } from 'react'
import './App.scss'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Manager } from 'socket.io-client'
import Nav from 'react-bootstrap/esm/Nav'
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap'

enum MODE {
    NEUTRAL = '/neutral',
    MASTER = '/master',
    SLAVE = '/slave'
}

enum STATUS {
    CLOSE,
    OPEN
}

const defaultMessage = 'You are not connected :('

const socketManager = new Manager('http://localhost:3001', {
    autoConnect: false
})

function App () {
    const [status, setStatus] = useState(STATUS.CLOSE)
    const [mode, setMode] = useState(MODE.NEUTRAL)
    const [events, setEvents] = useState<string[]>([])
    const [socket, setSocket] = useState<SocketIOClient.Socket>()
    const [message, setMessage] = useState(defaultMessage)
    const [respond, setRespond] = useState('')

    useEffect(() => {

    }, [])

    useEffect(() => {
        const _socket = socketManager.socket(mode)
        _socket.on('connect', () => {
            setStatus(STATUS.OPEN)
        })
        _socket.on('disconnect', () => {
            setMessage(defaultMessage)
            setStatus(STATUS.CLOSE)
        })
        _socket.on('greeting', (msg: string) => {
            setMessage(msg)
        })
        setSocket(_socket)
    }, [mode])

    useEffect(() => {
        socket?.on('event', (msg: string) => {
            setEvents([...events, msg])
        })
    }, [events, socket])

    const connect = () => {
        socket?.open()
    }

    const disconnect = () => {
        socket?.close()
    }

    const changeMode = (eventKey: any) => {
        setMode(eventKey)
    }

    const joinRoom = (eventKey: any) => {
        socket?.emit('join', eventKey)
    }

    const FormInput = () => {
        return <div
            className="position-absolute"
            style={{ right: 20, top: 20 }}
        >
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Enter message here..."
                />
                <InputGroup.Append>
                    <Button variant="info">Send</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    }

    const Navigation = () => {
        return <div
            className="position-absolute"
            style={{ left: 20, bottom: 20, zoom: 0.75 }}
        >
            <Nav variant="pills" onSelect={changeMode} activeKey={mode}>
                <Nav.Item>
                    <Nav.Link disabled={status === STATUS.OPEN} eventKey={MODE.NEUTRAL}>Neutral</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link disabled={status === STATUS.OPEN} eventKey={MODE.SLAVE}>Slave</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link disabled={status === STATUS.OPEN} eventKey={MODE.MASTER}>Master</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    }

    const FormAction = () => {
        return <div
            className="position-absolute"
            style={{ left: 20, top: 20 }}
        >
            <ButtonGroup>
                <Button variant="success" onClick={connect} disabled={status === STATUS.OPEN}>
                    Connect
                </Button>
                <DropdownButton as={ButtonGroup} title="Join Room" disabled={status === STATUS.CLOSE}>
                    <Dropdown.Item eventKey="Beginner" onSelect={joinRoom}>Beginner</Dropdown.Item>
                    <Dropdown.Item eventKey="Advanced" onSelect={joinRoom}>Advanced</Dropdown.Item>
                </DropdownButton>
                <Button variant="danger" onClick={disconnect} disabled={status === STATUS.CLOSE}>
                    Disconnect
                </Button>
            </ButtonGroup>
        </div>
    }

    const Events = () => {
        return <div className="position-absolute" style={{ right: 20, bottom: 20 }}>
            {events.map((event, index) => (
                <div className="my-2" style={{ fontSize: '16px' }} key={index}>
                    {event}
                </div>
            ))}
        </div>
    }

    const Info = () => {
        return <div className='d-flex flex-column align-items-center'>
            <span
                className={`circle shadow ${
                    status ? 'bg-success' : 'bg-danger'
                }`}
            />
            <small className="mt-3 text-muted">
                {message}
            </small>
        </div>
    }

    return (
        <div className="App">
            <header className="App-header">
                <FormInput/>
                <FormAction/>
                <Navigation/>
                <Events/>
                <Info />
            </header>
        </div>
    )
}

export default App
