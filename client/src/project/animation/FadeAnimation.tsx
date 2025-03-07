import React, { FC } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styled from 'styled-components'
import { STATUS_INSTRUCTOR, STATUS_STUDENT } from '../util/Enum'

const TransitionContainer = styled.div`
  width: 100%;
  height: 100%;
  
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter-active {
    opacity: 1;
  }

  .fade-enter-done {
    height: 100%;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0.01;
  }

  .fade-exit-active, .fade-enter-active {
    transition: all 100ms ease-in-out;
  }
`

interface Prop {
    cssKey: string | STATUS_STUDENT | STATUS_INSTRUCTOR
}
const FadeAnimation:FC<Prop> = (prop) => {
    if (prop.cssKey === STATUS_STUDENT.ANSWERED) {
        return <TransitionContainer>
            { prop.children }
        </TransitionContainer>
    }

    return (
        <TransitionContainer>
            <SwitchTransition>
                <CSSTransition key={prop.cssKey}
                    addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
                    classNames='fade'>
                    { prop.children }
                </CSSTransition>
            </SwitchTransition>
        </TransitionContainer>
    )
}

export default FadeAnimation
