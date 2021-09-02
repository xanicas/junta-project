import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Landing from '../pages/Landing';

class Routes extends React.Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;
