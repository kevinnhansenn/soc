import React, { ChangeEvent, FC, useState } from 'react'
import { STATUS_INSTRUCTOR } from '../../util/Enum'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

interface Prop {
    changeStatus: (status: STATUS_INSTRUCTOR) => void
}
const Pre: FC<Prop> = () => {
    const [qbank, setQbank] = useState([
        {
            id: 1,
            text: '',
            answer: true,
            placeholder: 'Required'
        },
        {
            id: 2,
            text: '',
            answer: false,
            placeholder: '(Optional)'
        },
        {
            id: 3,
            text: '',
            answer: false,
            placeholder: '(Optional)'
        },
        {
            id: 4,
            text: '',
            answer: false,
            placeholder: '(Optional)'
        }
    ])

    const handleChangeCheckbox = (e: any) => {
        const editedFormId = e.target.name
        const cloneQbank = [...qbank]
        cloneQbank.map(q => {
            if (q.id === parseInt(editedFormId)) {
                q.answer = !q.answer
            }
            return q
        })
        setQbank(cloneQbank)
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const editedFormId = e.target.name
        const cloneQbank = [...qbank]
        cloneQbank.map(q => {
            if (q.id === parseInt(editedFormId)) {
                q.text = e.target.value
            }
            return q
        })
        setQbank(cloneQbank)
    }

    return <div className='h-100 flex-center'>
        <div className='mx-4 mt-3'>
            <InputGroup className='mb-4'>
                <InputGroup.Prepend>
                    <InputGroup.Text>Question</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="textarea" aria-label="With textarea" rows={3} />
            </InputGroup>
            {
                qbank.map((q, i, a) => <InputGroup key={q.id} className='mb-2'>
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
