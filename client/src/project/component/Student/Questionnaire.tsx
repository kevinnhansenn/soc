import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { answerQuestion, getQuestion } from '../../redux/Student'
import { Choice } from '../../redux/Instructor'

const Questionnaire: FC = () => {
    const question = useSelector(getQuestion)

    const dispatch = useDispatch()
    const selectChoice = (choice: Choice) => dispatch(answerQuestion(question!.id, choice))

    return (
        <div className="h-100">
            <div className={'flex-center h-25 pb-3'} style={{ fontSize: 32 }}>
                { question?.question }
            </div>
            <div className="d-flex h-75" style={{ flexWrap: 'wrap' }}>
                { question?.choices.map(choice => (
                    <div
                        key={choice.id}
                        onClick={() => selectChoice(choice)}
                        style={{
                            fontSize: 24
                        }}
                        className={'flex-center btn btn-info border text-white h-50 w-50 '}
                    >
                        { choice.text }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Questionnaire
