import React, { FC } from 'react'
import { STATUS } from '../../util/Enum'

interface Prop {
    changeStatus: (status: STATUS) => void
}
const Waiting: FC<Prop> = () => {
    return <div>
        <h1>WAITING Room</h1>
    </div>
}

export default Waiting
