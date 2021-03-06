import React, { FC } from 'react'
import Waiting from './Waiting'
import Pre from './Pre'
import Post from './Post'
import { STATUS_INSTRUCTOR } from '../../util/Enum'
import FadeAnimation from '../../animation/FadeAnimation'

interface Prop {
    status: STATUS_INSTRUCTOR,
    changeStatus: (status: STATUS_INSTRUCTOR) => void
}

const Application: FC<Prop> = (prop) => {
    const currentStatus = prop.status

    const RenderView = () => {
        if (currentStatus === STATUS_INSTRUCTOR.PRE) return <Pre changeStatus={prop.changeStatus} />

        if (currentStatus === STATUS_INSTRUCTOR.POST) return <Post changeStatus={prop.changeStatus} />

        return <Waiting />
    }

    return <FadeAnimation cssKey={currentStatus}>
        <RenderView />
    </FadeAnimation>
}

export default Application
