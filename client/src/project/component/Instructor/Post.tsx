import React, { FC } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { STATUS } from '../../util/Enum'
import { ProgressBar } from 'react-bootstrap'

interface Prop {
    changeStatus: (status: STATUS) => void
}

const Post: FC<Prop> = () => {
    const now = 60

    return <div className='d-flex flex-column px-2 h-100'>
        <Card className={'mb-2'}>
            <Card.Body style={{ fontSize: 24 }} className={'font-weight-bold p-3'}>Room #123456789</Card.Body>
        </Card>
        <div className='d-flex justify-content-between flex-grow-1 overflow-auto'>
            <Card style={{ width: '48%' }}>
                <Card.Body className={'p-0 overflow-auto'}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='border border-success text-success'>Completed</ListGroup.Item>
                        {
                            Array.from(Array(2), (e, i) => <ListGroup.Item className='p-1' key={i}>Student A</ListGroup.Item>)
                        }
                        <ListGroup.Item className="border border-warning text-warning">Answering...</ListGroup.Item>
                        {
                            Array.from(Array(8), (e, i) => <ListGroup.Item className='p-1' key={i}>Student b</ListGroup.Item>)
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card className='overflow-auto' style={{ width: '48%' }}>
                {
                    Array.from(Array(4), (e) => <Card.Body key={e} className={'pt-3 pb-0 text-left'}>
                        <div style={{ fontSize: 16 }} className='font-weight-bold mb-2 separator'>Answer 1</div>
                        <div className="dropdown-divider"></div>
                        <div style={{ fontSize: 12 }} className='bold mb-2 separator'>3 Students answered this.</div>
                        <ProgressBar variant='success' now={now} label={`${now}%`} />
                    </Card.Body>)
                }
            </Card>
        </div>
    </div>
}

export default Post
