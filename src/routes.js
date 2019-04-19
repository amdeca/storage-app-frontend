import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './pages/main';
import Storage from './pages/storage';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main}/>
            <Route path="/storage/:id" component={Storage}/>
        </Switch>
    </BrowserRouter>
);

export default Routes;