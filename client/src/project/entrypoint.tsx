import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Student from "./page/Student";
import Instructor from "./page/Instructor";

function Entrypoint() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path='/instructor'>
                        <Instructor />
                    </Route>
                    <Route path='/'>
                        <Student />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default Entrypoint
