import React, { FC, useState } from 'react'
import { STATUS } from '../../util/Enum'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

interface Prop {
    changeStatus: (status: STATUS) => void
}
const Pre: FC<Prop> = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
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

    const handleChange = (e: any) => {
        console.log(e)
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
                qbank.map(q => <InputGroup key={q.id} className='mb-2'>
                    <InputGroup.Prepend>
                        <InputGroup.Checkbox name={q.id} checked={q.answer} onChange={handleChange} />
                    </InputGroup.Prepend>
                    <FormControl placeholder={q.placeholder} />
                </InputGroup>)
            }
            {/* <InputGroup className='mb-2'> */}
            {/*    <InputGroup.Prepend> */}
            {/*        <InputGroup.Checkbox aria-label="Correct Answer" /> */}
            {/*    </InputGroup.Prepend> */}
            {/*    <FormControl placeholder='Required' aria-label="Answer Option" /> */}
            {/* </InputGroup> */}
            {/* <InputGroup className='mb-2'> */}
            {/*    <InputGroup.Prepend> */}
            {/*        <InputGroup.Checkbox aria-label="Correct Answer" /> */}
            {/*    </InputGroup.Prepend> */}
            {/*    <FormControl disabled placeholder='(Optional)' aria-label="Answer Option" /> */}
            {/* </InputGroup> */}
            {/* <InputGroup className='mb-2'> */}
            {/*    <InputGroup.Prepend> */}
            {/*        <InputGroup.Checkbox aria-label="Correct Answer" /> */}
            {/*    </InputGroup.Prepend> */}
            {/*    <FormControl disabled placeholder='(Optional)' aria-label="Answer Option" /> */}
            {/* </InputGroup> */}
            {/* <InputGroup className='mb-2'> */}
            {/*    <InputGroup.Prepend> */}
            {/*        <InputGroup.Checkbox aria-label="Correct Answer" /> */}
            {/*    </InputGroup.Prepend> */}
            {/*    <FormControl disabled placeholder='(Optional)' aria-label="Answer Option" /> */}
            {/* </InputGroup> */}
        </div>

    </div>
}

export default Pre
