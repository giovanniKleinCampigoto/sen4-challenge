import React, { Component } from 'react';
import styled from 'styled-components';

import SearchBar from '../../components/dataEntry/searchBar'

const ContainerMain = styled.section`
    height: 100vh;
    padding: 30px;
    background green;
`

class Main extends Component {
    state = {  }
    render() {
        return (
            <ContainerMain>
                <SearchBar/>
            </ContainerMain>
        );
    }
}

export default Main;