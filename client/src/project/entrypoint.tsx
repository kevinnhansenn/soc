import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Student from './page/Student'
import Instructor from './page/Instructor'
import Testing from './page/Testing'

import { Provider } from 'react-redux'
import { InstructorStore } from './redux/Instructor'
import { StudentStore } from './redux/Student'

const instructorStore = InstructorStore()
const studentStore = StudentStore()

function Entrypoint () {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/testing">
                        <Testing />
                    </Route>
                    <Route path="/instructor">
                        <Provider store={instructorStore}>
                            <Instructor />
                        </Provider>
                    </Route>
                    <Route path="/">
                        <Provider store={studentStore}>
                            <Student />
                        </Provider>
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default Entrypoint
