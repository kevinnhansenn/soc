import React, { FunctionComponent, useState } from 'react'
import Waiting from './Waiting'
import Pre from './Pre'
import Post from './Post'
import { STATUS } from '../../util/Enum'

interface Prop {
    login: (status: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Application: FunctionComponent<Prop> = (prop) => {
    const [state, setState] = useState<STATUS>(STATUS.WAITING)

    const changeStatus = (status: STATUS) => {
        setState(status)
    }

    if (state === STATUS.PRE) return <Pre changeStatus={changeStatus} />

    if (state === STATUS.POST) return <Post changeStatus={changeStatus} />

    return <Waiting changeStatus={changeStatus} />
}

export default Application
