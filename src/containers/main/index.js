import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import SearchBar from '../../components/dataEntry/searchBar';
import Item from '../../components/dataDisplay/item'

import SearchService from '../../services/searchService';

import { ItemContext } from '../../components/context/ItemContext';

const ContainerMain = styled.section`
    min-height: 100vh;
    padding: 30px;
`

const Music = styled(Item)`
    display: flex;
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Helvetica;
`

const SeekText = styled.p`
    color: #aaa;
`
class Main extends Component {

    getResults = (value, pushResults) => {        
        pushResults(value)
    }

    pushToArtistPage = (element) => {
        const { history: { push } } = this.props

        push('/artist');
    }

    renderResults = (results) => results.map((element, index) => (
        <Music 
            onClick={() => this.pushToArtistPage(element)}
            name={element.trackName}
            artist={element.artistName}
            audio={element.previewUrl}
            img={element.artworkUrl100}
            key={index} />
    )) 

    resolveRendering (returnedResults) {
        return returnedResults.results.length ? this.renderResults(returnedResults.results) : <SeekText>Type in the input to find awesome stuff!</SeekText>
    }

    render() {
        return (
            <ContainerMain>
                <ItemContext.Consumer>
                        {({ pushResults, pushCurrentArtist }) => (
                            <SearchBar
                                service={SearchService.searchByTerm}
                                results={(value) => this.getResults(value, pushResults)}/>
                        )}
                </ItemContext.Consumer>
                <ItemContext.Consumer>
                        {({returnedResults}) => (
                           this.resolveRendering(returnedResults)
                        )}
                </ItemContext.Consumer>
            </ContainerMain>
        );
    }
}

export default withRouter(Main);