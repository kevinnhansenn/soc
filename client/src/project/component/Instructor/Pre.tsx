import React, { FC } from 'react'
import { STATUS } from '../../util/Enum'

interface Prop {
    changeStatus: (status: STATUS) => void
}
const Pre: FC<Prop> = () => {
    return <div>
        <h1>PRE Room</h1>
    </div>
}

export default Pre
