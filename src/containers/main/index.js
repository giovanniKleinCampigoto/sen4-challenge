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

const ItemSeparator = styled.p`
    font-size: 2em;
    border-bottom: 1px solid #aaa;
`

const Music = styled(Item)`
    display: flex;
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Helvetica;
`

const Artist = styled(Item)`
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

    getResults = (value, pushMusicResults, pushArtistResults) => {  
        pushMusicResults(value.responseMusic)
        pushArtistResults(value.responseArtists)
    }

    pushToArtistPage = (element, pushCurrentArtist) => {
        const { history: { push } } = this.props

        pushCurrentArtist(element);

        push('/artist');
    }

    renderMusicResults = (results, pushCurrentArtist) => (
        <React.Fragment>
            <ItemSeparator>Musics</ItemSeparator>
            {
                results.map((element, index) => (                
                    <Music 
                        hasPlayer
                        onClick={() => this.pushToArtistPage(element, pushCurrentArtist)}
                        name={element.trackName}
                        artist={element.artistName}
                        audio={element.previewUrl}
                        img={element.artworkUrl100}
                        key={index} />

                    )) 
            }
        </React.Fragment>
    )
    
    

    renderArtistResults = (results, pushCurrentArtist) => (
        <React.Fragment>
            {console.log(results)}
            <ItemSeparator>Albums</ItemSeparator>
            {
                results.map((element, index) => (   
                        element.results.map((artist, artIndex) => (
                            <Artist                         
                                onClick={() => this.pushToArtistPage(element, pushCurrentArtist)}
                                name={artist.collectionName}
                                genre={artist.primaryGenreName}
                                artist={artist.artistName}
                                img={artist.artworkUrl100}
                                key={`el-${index}-art-${artIndex}`} />
                        ))             
                    )) 
            }
        </React.Fragment>

    )

    resolveMusicRendering (returnedMusicResults, pushCurrentArtist) {
        return returnedMusicResults.results.length ? this.renderMusicResults(returnedMusicResults.results, pushCurrentArtist) : null
    }

    resolveArtistRendering (returnedArtistResults, pushCurrentArtist) {
        return returnedArtistResults.length ? this.renderArtistResults(returnedArtistResults, pushCurrentArtist) : null
    }

    render() {
        return (
            <ContainerMain>
                <ItemContext.Consumer>
                        {({ pushMusicResults, pushArtistResults}) => (
                            <SearchBar
                                service={SearchService}
                                results={(value) => this.getResults(value, pushMusicResults, pushArtistResults)}/>
                        )}
                </ItemContext.Consumer>
                <ItemContext.Consumer>
                        {({returnedMusicResults, pushCurrentArtist}) => (
                           this.resolveMusicRendering(returnedMusicResults, pushCurrentArtist)
                        )}
                </ItemContext.Consumer>
                <ItemContext.Consumer>
                        {({returnedArtistResults, pushCurrentArtist}) => (
                           this.resolveArtistRendering(returnedArtistResults, pushCurrentArtist)
                        )}
                </ItemContext.Consumer>
            </ContainerMain>
        );
    }
}

export default withRouter(Main);