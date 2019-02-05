import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../src/assets/icons/icomoon/style.css'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes'

const rootElement = document.getElementById('root');

const Router = (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>    
);

ReactDOM.render(
    Router
    , rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
