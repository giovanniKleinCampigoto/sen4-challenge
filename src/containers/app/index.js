import React, { Component } from 'react';

import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import Routes from '../../routes';
export default class App extends Component {
    state = {  }
    render() {
        return (
            <React.Fragment>
                <Header/>
                    <Routes/>
                <Footer/>
            </React.Fragment>
        );
    }
}