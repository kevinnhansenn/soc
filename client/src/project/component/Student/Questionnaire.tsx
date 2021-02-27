import React, { FC } from 'react'

interface Prop {
    changeReady: (status: boolean) => void
}

const Questionnaire:FC<Prop> = (prop) => {
    return <div>
        <h1 onClick={() => prop.changeReady(false)}>Questionnaire</h1>
    </div>
}

export default Questionnaire
