import React, { ChangeEvent, FC } from 'react'
import { STATUS_INSTRUCTOR } from '../../util/Enum'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { getChoices, updateChoices, Choice, updateQuestion } from '../../redux/Instructor'

interface Prop {
    changeStatus: (status: STATUS_INSTRUCTOR) => void
}
const Pre: FC<Prop> = () => {
    const choices = useSelector(getChoices)
    const cloneQuestions = JSON.parse(JSON.stringify(choices))
    const dispatch = useDispatch()
    const setChoices = (c: Choice[]) => dispatch(updateChoices(c))
    const setQuestion = (q: string) => dispatch(updateQuestion(q))

    const handleChangeCheckbox = (e: any) => {
        const editedFormId = e.target.name
        cloneQuestions.map((q: Choice) => {
            if (q.id === parseInt(editedFormId)) {
                q.answer = !q.answer
            }
            return q
        })
        setChoices(cloneQuestions)
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const editedFormId = e.target.name
        cloneQuestions.map((q: Choice) => {
            if (q.id === parseInt(editedFormId)) {
                q.text = e.target.value
            }
            return q
        })
        setChoices(cloneQuestions)
    }

    return <div className='h-100 flex-center'>
        <div className='mx-4 mt-3'>
            <InputGroup className='mb-4'>
                <InputGroup.Prepend>
                    <InputGroup.Text >
                        Question
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    rows={3}
                    onChange={
                        (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)
                    }
                />
            </InputGroup>
            {
                choices.map((q, i, a) => <InputGroup key={q.id} className='mb-2'>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox
                            disabled={a[i - 1] ? a[i - 1].text === '' : false}
                            name={q.id}
                            checked={q.answer}
                            onChange={handleChangeCheckbox} />
                    </InputGroup.Prepend>
                    <FormControl
                        onChange={handleChangeInput}
                        name={q.id.toString()}
                        placeholder={q.placeholder}
                        disabled={a[i - 1] ? a[i - 1].text === '' : false} />
                </InputGroup>)
            }
        </div>
    </div>
}

export default Pre
