import React, { FC, useState } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'

const Waiting: FC = () => {
    const [mode, setMode] = useState('0')

    const modeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMode(event.target.value)
    }

    return <div className='d-flex flex-column px-2 h-100'>
        <Card className={'mb-2'}>
            <Card.Body style={{ fontSize: 24 }} className={'font-weight-bold p-3'}>Room 7658947A</Card.Body>
        </Card>
        <div className='d-flex justify-content-between flex-grow-1 overflow-auto'>
            <Card style={{ width: '48%' }}>
                <Card.Body className={'p-0 overflow-auto'}>
                    <ListGroup variant='flush'>
                        {
                            Array.from(Array(20), (e, i) => <ListGroup.Item key={i}>Student A</ListGroup.Item>)
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card className='overflow-auto' style={{ width: '48%' }}>
                <Card.Body className={'py-3 text-left'}>
                    <div style={{ fontSize: 20 }} className='font-weight-bold mb-2 separator'>Mode</div>
                    <div className="dropdown-divider"></div>
                    <Form.Group>
                        <Form.Check
                            type="radio"
                            label="Multiple Choices"
                            name="mode"
                            value="0"
                            checked={mode === '0'}
                            onChange={modeChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Survey / Voting"
                            name="mode"
                            value="1"
                            checked={mode === '1'}
                            onChange={modeChange}
                        />
                    </Form.Group>
                </Card.Body>
            </Card>
        </div>
    </div>
}

export default Waiting
