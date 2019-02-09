import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// App container
import App from './containers/app';

// Stylesheets
import './index.css';
import '../src/assets/icons/icomoon/style.css'

// Context API
import ItemProvider from './components/context/ItemProvider';

// Root element in HTML for rendering
const rootElement = document.getElementById('root');

const Router = (
    <ItemProvider>
        <App />
    </ItemProvider>
);

ReactDOM.render(
    Router
    , rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
