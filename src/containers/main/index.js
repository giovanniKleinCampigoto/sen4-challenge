import React, { Component } from 'react';
import styled from 'styled-components';

import SearchBar from '../../components/dataEntry/searchBar';
import Item from '../../components/dataDisplay/item'

import SearchService from '../../services/searchService';

const ContainerMain = styled.section`
    min-height: 100vh;
    padding: 30px;
    background green;
`

const Music = styled(Item)`
    display: flex;
    margin-top: 10px;
    padding: 15px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Helvetica;
`

const INITIAL_STATE = {
    behaviors: {

    },
    values: {
        returnedResult: {
            results: []
        }
    }
}

class Main extends Component {
    state = INITIAL_STATE;

    getResults = value => {        
        this.setState({
            values: {
                returnedResult: value
            }
        })
    }

    renderResults = () => this.state.values.returnedResult.results.map((element, index) => (
        <Music 
            name={element.trackName}
            artist={element.artistName}
            audio={element.previewUrl}
            img={element.artworkUrl100}
            key={index} />
    )) 

    resolveRendering () {
        const { state: { values: { returnedResult : { results } } } } = this

        return results.length ? this.renderResults() : null
    }

    render() {
        return (
            <ContainerMain>
                <SearchBar
                    service={SearchService.searchByTerm}
                    results={this.getResults}/>
                {this.resolveRendering()}
            </ContainerMain>
        );
    }
}

export default Main;