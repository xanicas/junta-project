import React, { useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from '../pages/Landing';
import Eleitores from '../pages/Eleitores';
import Login from '../pages/Login';

function Routes() {
    const [token, setToken] = useState();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/eleitores' component={Eleitores}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
