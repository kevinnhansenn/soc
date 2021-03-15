import React, { FC } from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { STATUS_INSTRUCTOR } from '../../util/Enum'
import { ProgressBar } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { getChoices, getParticipants, getRoom, getStudentAnswers } from '../../redux/Instructor'

interface Prop {
    changeStatus: (status: STATUS_INSTRUCTOR) => void
}

const Post: FC<Prop> = () => {
    const participants = useSelector(getParticipants)
    const studentAnswers = useSelector(getStudentAnswers)
    const choices = useSelector(getChoices)
    const room = useSelector(getRoom)

    const answered = studentAnswers.map(s => s.student)
    const notAnswer = participants.filter(p => !answered.includes(p))

    interface Choices {
        id: number,
        answer: string,
        isAnswer: boolean,
        numberOfStudents: number,
        percentage: number
    }

    const _choices: Choices[] = choices.map(c => {
        const numberOfStudents = studentAnswers.filter(s => s.choice.id === c.id).length

        let percentage = 0
        if (answered.length) {
            percentage = 100 * numberOfStudents / answered.length
        }

        return {
            id: c.id,
            answer: c.text,
            isAnswer: c.answer,
            numberOfStudents,
            percentage
        }
    })

    return <div className='d-flex flex-column px-2 h-100'>
        <Card className={'mb-2'}>
            <Card.Body style={{ fontSize: 24 }} className={'font-weight-bold p-3'}>Room #{ room }</Card.Body>
        </Card>
        <div className='d-flex justify-content-between flex-grow-1 overflow-auto'>
            <Card style={{ width: '48%' }}>
                <Card.Body className={'p-0 overflow-auto'}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='border border-success text-success'>Completed</ListGroup.Item>
                        {
                            answered.map(student => <ListGroup.Item className='p-1' key={student}>{ student }</ListGroup.Item>)
                        }
                        <ListGroup.Item className="border border-warning text-warning">Answering...</ListGroup.Item>
                        {
                            notAnswer.map(student => <ListGroup.Item className='p-1' key={student}>{ student }</ListGroup.Item>)
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card className='overflow-auto' style={{ width: '48%' }}>
                {
                    _choices.map(c => <Card.Body
                        key={c.id}
                        className={`pt-3 pb-0 text-left ${c.answer === '' && 'invisible'}`}>
                        <div
                            style={{ fontSize: 16 }}
                            className={`font-weight-bold mb-2 separator ${c.isAnswer ? 'text-success' : 'text-danger'}`}
                        >{ c.answer }</div>

                        <div className="dropdown-divider" />
                        <div style={{ fontSize: 12 }} className='bold mb-2 separator'>{c.numberOfStudents} Students answered this.</div>
                        <ProgressBar
                            variant='success'
                            now={parseFloat(c.percentage.toFixed(2))}
                            label={`${c.percentage.toFixed(2)}%`} />
                    </Card.Body>)
                }
            </Card>
        </div>
    </div>
}

export default Post
