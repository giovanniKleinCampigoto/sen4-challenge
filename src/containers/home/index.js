import React, { Component } from 'react';

import Header from '../../components/layout/header';
import Footer from '../../components/layout/footer';
import Main from '../../components/layout/main';

export default class Home extends Component {
    state = {  }
    render() {
        return (
            <React.Fragment>
                <Header/>
                <Main/>
                <Footer/>
            </React.Fragment>
        );
    }
}