import React, { FC } from 'react'
import { STATUS } from '../../util/Enum'

interface Prop {
    changeStatus: (status: STATUS) => void
}
const Post: FC<Prop> = () => {
    return <div>
        <h1>POST Room</h1>
    </div>
}

export default Post
