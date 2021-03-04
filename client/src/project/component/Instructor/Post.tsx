import React, { FC } from 'react'
import { STATUS } from '../../util/Enum'

interface Prop {
    changeStatus: (status: STATUS) => void
}
const Post: FC<Prop> = (prop) => {
    return <div>
        <h1 onClick={() => prop.changeStatus(STATUS.PRE)}>POST Room</h1>
    </div>
}

export default Post
