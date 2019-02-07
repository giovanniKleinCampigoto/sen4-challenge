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
class Main extends Component {

    getResults = (value, pushMusicResults, pushArtistResults) => {  
        pushMusicResults(value.responseMusic)
        pushArtistResults(value.responseArtists)
    }

    fetchArtistInfo = async (currentArtist, pushCurrentArtist, pushRelatedArtists) => {
        try {
            const response = await SearchService.getArtistDetails(currentArtist);

            const current  = response.data.results.shift();
            pushRelatedArtists(response.data);
            this.fetchArtistDetails(current, pushCurrentArtist);

        } catch (e) {
            console.error(e);
        }
    }

    fetchArtistDetails = async (current, pushCurrentArtist) => {
        const { history: { push } } = this.props

        try {
            const response = await  SearchService.getArtistById(current.amgArtistId);
            pushCurrentArtist(response.data.results[1]);
            push('/artist');

        } catch(e) {    
            console.error(e)
        }
    }

    pushToArtistPage = (element, pushCurrentArtist, pushRelatedArtists) => {
        const { history: { push } } = this.props

        if  (element.wrapperType === "track") {
            this.fetchArtistInfo(element.artistName, pushCurrentArtist, pushRelatedArtists);
        } else {
            pushCurrentArtist(element.results[0]);
            pushRelatedArtists(element);    
            push('/artist');
        }

    }

    renderMusicResults = (results, pushCurrentArtist, pushRelatedArtists) => (
        <React.Fragment>
            <ItemSeparator>Musics</ItemSeparator>
            {
                results.map((element, index) => (                
                    <Music 
                        hasPlayer
                        onClick={() => this.pushToArtistPage(element, pushCurrentArtist, pushRelatedArtists)}
                        name={element.trackName}
                        artist={element.artistName}
                        audio={element.previewUrl}
                        img={element.artworkUrl100}
                        key={index} />

                    )) 
            }
        </React.Fragment>
    )
    
    renderArtistAlbuns = (element, index, pushCurrentArtist, pushRelatedArtists) => element.results.map((artist, artIndex) => (
        <Artist                         
            onClick={() => this.pushToArtistPage(element, pushCurrentArtist, pushRelatedArtists)}
            name={artist.collectionName}
            genre={artist.primaryGenreName}
            artist={artist.artistName}
            img={artist.artworkUrl100}
            key={`el-${index}-art-${artIndex}`} />
    ))   

    renderArtistResults = (results, pushCurrentArtist, pushRelatedArtists) => {    
        return results.map((element, index) => {
            return (
                <React.Fragment key={index}>
                    <ItemSeparator>{element.results[0].artistName}</ItemSeparator>
                    {this.renderArtistAlbuns(element, index, pushCurrentArtist, pushRelatedArtists)}
                </React.Fragment>                            
            )
        }) 
    }

    resolveMusicRendering (returnedMusicResults, pushCurrentArtist, pushRelatedArtists) {
        return returnedMusicResults.results.length ? this.renderMusicResults(returnedMusicResults.results, pushCurrentArtist, pushRelatedArtists) : null
    }

    resolveArtistRendering (returnedArtistResults, pushCurrentArtist, pushRelatedArtists) {
        return returnedArtistResults.length ? this.renderArtistResults(returnedArtistResults, pushCurrentArtist, pushRelatedArtists) : null
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
                        {({returnedMusicResults, pushCurrentArtist, pushRelatedArtists}) => (
                           this.resolveMusicRendering(returnedMusicResults, pushCurrentArtist, pushRelatedArtists)
                        )}
                </ItemContext.Consumer>
                <ItemContext.Consumer>
                        {({returnedArtistResults, pushCurrentArtist, pushRelatedArtists}) => (
                           this.resolveArtistRendering(returnedArtistResults, pushCurrentArtist, pushRelatedArtists)
                        )}
                </ItemContext.Consumer>
            </ContainerMain>
        );
    }
}

export default withRouter(Main);