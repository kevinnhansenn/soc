import React, { FunctionComponent, useState } from 'react'
import Waiting from './Waiting'
import Pre from './Pre'
import Post from './Post'
import { STATUS } from '../../util/Enum'

const Application: FunctionComponent = () => {
    const [state, setState] = useState<STATUS>(STATUS.WAITING)

    const changeStatus = (status: STATUS) => {
        setState(status)
    }

    if (state === STATUS.PRE) return <Pre changeStatus={changeStatus} />

    if (state === STATUS.POST) return <Post changeStatus={changeStatus} />

    return <Waiting changeStatus={changeStatus} />
}

export default Application
