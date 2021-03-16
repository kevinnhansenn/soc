import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { answerQuestion, getCurrentAnswer, getQuestion, getResultInfo } from '../../redux/Student'
import { Choice } from '../../redux/Instructor'

const Questionnaire: FC = () => {
    const question = useSelector(getQuestion)
    const currentAnswer = useSelector(getCurrentAnswer)
    const resultInfo = useSelector(getResultInfo)

    const dispatch = useDispatch()
    const selectChoice = (choice: Choice) => {
        dispatch(answerQuestion(question!.id, choice))
    }

    const decideClass = (choice: Choice) => {
        // No choice
        if (!choice.text) {
            return 'disabled btn-outline-info'
        } else {
            // Result not yet announced
            if (resultInfo === 'IDLE') {
                // Answer is selected
                if (choice.id === currentAnswer?.id) {
                    return 'btn-warning'
                }
                // Not yet answer state
                if (!currentAnswer) {
                    return 'btn-info'
                }
            } else if (choice.id === currentAnswer?.id) {
                if (resultInfo === 'CORRECT') {
                    return 'btn-success'
                }
                if (resultInfo === 'WRONG') {
                    return 'btn-danger'
                }
            } else {
                return 'btn-secondary opacity-50'
            }
        }
    }

    const baseStyle = 'd-flex align-items-center justify-content-center btn border text-white h-50 w-50'

    return (
        <div className="h-100">
            <div className={'flex-center h-25 pb-3'} style={{ fontSize: 32 }}>
                { question?.question }
            </div>
            <div className="d-flex h-75" style={{ flexWrap: 'wrap' }}>
                { question?.choices.map((choice) => {
                    return <div
                        key={choice.id}
                        onClick={() => selectChoice(choice)}
                        style={{
                            fontSize: 24
                        }}
                        className={`
                            ${baseStyle}
                            ${decideClass(choice)}
                        `}
                    >
                        { choice.text }
                    </div>
                })}
            </div>
        </div>
    )
}

export default Questionnaire
