import React, { FC } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'

const TransitionContainer = styled.div`
    .slide-enter {
        opacity: 0.01;
    }

    .slide-enter-active {
        opacity: 1;
    }

    .slide-exit {
        opacity: 1;
    }

    .slide-exit-active {
        opacity: 0.01;
    }

    .slide-exit-active,
    .slide-enter-active {
        transition: all 200ms ease-in-out;
    }
`

interface Prop {
    cssKey: string
}
const FadingAnimation: FC<Prop> = (prop) => {
    return (
        <TransitionContainer className="w-100 h-100 d-flex align-items-center justify-content-center">
            <SwitchTransition>
                <CSSTransition
                    key={prop.cssKey}
                    addEndListener={(node, done) =>
                        node.addEventListener('transitionend', done, false)
                    }
                    classNames="slide"
                >
                    {prop.children}
                </CSSTransition>
            </SwitchTransition>
        </TransitionContainer>
    )
}

export default FadingAnimation
