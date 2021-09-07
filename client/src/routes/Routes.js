import React, { useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from '../pages/Landing';
import Eleitores from '../pages/Eleitores';
import Login from '../pages/Login';

import useToken from '../components/useToken';

function setToken(userToken) {~
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function Routes() {
    const { token, setToken } = useToken();

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
