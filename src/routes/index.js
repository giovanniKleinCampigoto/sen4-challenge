import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../containers/main'
import ArtistPage from '../containers/artist'

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Main}/>
        <Route path="/artist" component={ArtistPage}/>
    </Switch>   
)

export default Routes;
