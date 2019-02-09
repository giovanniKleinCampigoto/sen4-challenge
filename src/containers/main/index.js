import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import SearchBar from '../../components/dataEntry/searchBar';
import Item from '../../components/dataDisplay/item';
import Grid from '../../components/layout/grid';
import Icon from '../../components/general/icon';

import SearchService from '../../services/searchService';

import { ItemContext } from '../../components/context/ItemContext';

const ContainerMain = styled.div`
    min-height: 100vh;
    width:inherit;
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

const InfiniteSpinner = styled(Icon)`
    color: #ccc;
    font-size: 2em;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
    }     
`
const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`

const ErrorMessage = styled.p`
    color: #aaa;
    font-size: 1.5em;
`

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
` 

class Main extends Component {
    state = {
        loadingRequests: false,
        failedFetching: false
    }

    getResults = (value, pushMusicResults, pushArtistResults) => {  
        pushMusicResults(value.responseMusic)
        pushArtistResults(value.responseArtists)
        this.setState({
            failedFetching: false
        })
    }

    pushToArtistPage = (element, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) => {
        if  (element.wrapperType === "track") {
            this.fetchArtistInfo(element.artistName, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums);
        } else {
            this.fetchRelatedArtists(element.results[0], pushRelatedArtists);
            pushCurrentArtist(element.results[0]);
            this.fetchAlbumsMusics(element, pushCurrentArtistAlbums);
        }

    }

    fetchArtistInfo = async (currentArtist, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) => {
        try {
            this.setState({
                loadingRequests:  true,
            })

            const response = await SearchService.getArtistDetails(currentArtist);

            const current  = response.data.results.filter(x => x.artistName === currentArtist)[0];
            pushRelatedArtists(response.data);
            this.fetchArtistDetails(current, pushCurrentArtist, pushCurrentArtistAlbums);

        } catch (e) {
            console.error(e);
        }
    }

    fetchRelatedArtists = async (currentArtist, pushRelatedArtists) => {
        try {
            const response = await SearchService.getArtistDetails(currentArtist);

            response.data.results.shift();
            pushRelatedArtists(response.data);
        } catch (e) {
            console.error(e);
        }
    }

    fetchArtistDetails = async (current, pushCurrentArtist, pushCurrentArtistAlbums) => {

        try {
            const response = await  SearchService.getArtistById(current.amgArtistId);
            if(!response.data.results.length) throw new Error('No results were found...')
            pushCurrentArtist(response.data.results[1]);
            
            this.fetchAlbumsMusics(response.data, pushCurrentArtistAlbums);
        } catch(e) {    
            this.setState({
                loadingRequests: false,
                failedFetching: true
            })
            console.error(e)
        }
    }

    fetchAlbumsMusics = async (albums, pushCurrentArtistAlbums) => {
        const { history: { push } } = this.props
        
        const albumsArray = albums.results
        
        const resultsArray = []
        try {
            for(let i = 1; i < albumsArray.length; i++) {
                const response = await SearchService.getAlbumMusics(albumsArray[i].collectionName);
                resultsArray.push({ album: albumsArray[i], musics: response.data.results})
            }

            pushCurrentArtistAlbums(resultsArray);
            push('/artist');
        } catch (e) {
            console.error(e)
        }
    }

    renderMusicResults = (results, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) => (
        <React.Fragment>
            <ItemSeparator>Musics</ItemSeparator>
            {
                results.map((element, index) => (                
                    <Music 
                        hasPlayer
                        onClick={() => this.pushToArtistPage(element, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums)}
                        name={element.trackName}
                        artist={element.artistName}
                        audio={element.previewUrl}
                        img={element.artworkUrl100}
                        key={index} />
                    )) 
            }
        </React.Fragment>
    )
    
    renderArtistAlbuns = (element, index, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) => element.results.map((artist, artIndex) => (
        <Artist                         
            onClick={() => this.pushToArtistPage(element, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums)}
            name={artist.collectionName}
            genre={artist.primaryGenreName}
            artist={artist.artistName}
            img={artist.artworkUrl100}
            key={`el-${index}-art-${artIndex}`} />
    ))   

    renderArtistResults = (results, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) => {    
        return results.map((element, index) => {
            return (
                <React.Fragment key={index}>
                    <ItemSeparator>{element.results[0].artistName}</ItemSeparator>
                    {this.renderArtistAlbuns(element, index, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums)}
                </React.Fragment>                            
            )
        }) 
    }

    resolveMusicRendering (returnedMusicResults, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) {
        return returnedMusicResults.results.length ? this.renderMusicResults(returnedMusicResults.results, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) : null
    }

    resolveArtistRendering (returnedArtistResults, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) {
        return returnedArtistResults.length ? this.renderArtistResults(returnedArtistResults, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) : null
    }

    isLoading () {
        
        if (this.state.loadingRequests) {
            return (
                <SpinnerContainer>
                    <InfiniteSpinner icon="spinner9"/>
                </SpinnerContainer>  
            )
        } else  {
            return this.isFailed();
        }
    }

    isFailed () {
        if (this.state.failedFetching) {
            return (
                <ErrorWrapper>
                    <ErrorMessage>Failed fetching results :/, please do another search</ErrorMessage>
                </ErrorWrapper>
            )
        } else {
            return (
                <React.Fragment>
                    <ItemContext.Consumer>
                        {({returnedMusicResults, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums}) => (
                            this.resolveMusicRendering(returnedMusicResults, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums)
                        )}
                    </ItemContext.Consumer>
                    <ItemContext.Consumer>
                            {({returnedArtistResults, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums}) => (
                                this.resolveArtistRendering(returnedArtistResults, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums)
                            )}
                    </ItemContext.Consumer>
                </React.Fragment>
    
            )
        }
    }

    render() {
        return (
            <Grid>
                <ContainerMain>
                    <ItemContext.Consumer>
                            {({ pushMusicResults, pushArtistResults}) => (
                                <SearchBar
                                    service={SearchService}
                                    results={(value) => this.getResults(value, pushMusicResults, pushArtistResults)}/>
                            )}
                    </ItemContext.Consumer>
                    {
                        this.isLoading()
                    }
                    
                </ContainerMain>
            </Grid>
        );
    }
}

export default withRouter(Main);