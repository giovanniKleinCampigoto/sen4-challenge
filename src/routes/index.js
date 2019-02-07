import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Main from '../containers/main'
import ArtistPage from '../containers/artist'
import NotFound from '../containers/notfound'
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="artist" component={ArtistPage}/>
        </Switch>   
    </BrowserRouter>
)

export default Routes;
