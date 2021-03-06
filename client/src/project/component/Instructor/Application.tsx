import React, { FC } from 'react'
import Waiting from './Waiting'
import Pre from './Pre'
import Post from './Post'
import { STATUS } from '../../util/Enum'
import FadeAnimation from '../../animation/FadeAnimation'

interface Prop {
    status: STATUS,
    changeStatus: (status: STATUS) => void
}

const Application: FC<Prop> = (prop) => {
    const currentStatus = prop.status

    const RenderView = () => {
        if (currentStatus === STATUS.PRE) return <Pre changeStatus={prop.changeStatus} />

        if (currentStatus === STATUS.POST) return <Post changeStatus={prop.changeStatus} />

        return <Waiting />
    }

    return <FadeAnimation cssKey={currentStatus}>
        <RenderView />
    </FadeAnimation>
}

export default Application
