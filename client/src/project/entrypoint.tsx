import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux'

import Student from './page/Student'
import Instructor from './page/Instructor'
import Testing from './page/Testing'

function Entrypoint () {
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Switch>
                        <Route path="/testing">
                            <Testing />
                        </Route>
                        <Route path="/instructor">
                            <Instructor />
                        </Route>
                        <Route path="/">
                            <Student />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </Provider>
    )
}

export default Entrypoint
