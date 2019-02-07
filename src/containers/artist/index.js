import React, { Component } from 'react';

import styled from 'styled-components';

import { ItemContext } from '../../components/context/ItemContext';

import Item from '../../components/dataDisplay/item'

import SearchService from '../../services/searchService';

const ArtistContent = styled.section`
    min-height: 100vh;
`

const ArtistDescriptionWrapper = styled.div`
    display: flex;
    padding: 15px;
    width: 100%;
    justify-content: center;
    background: transparent;
`

const ArtistDescription = styled.div`
    padding: 0 15px;
`

const ArtistName = styled.h1`
    font-size: 1em;
    color: rgb(60,60,60);
`   

const ArtistGenre = styled.p`
    font-size: 0.7em;
    color: rgb(60,60,60);
`

const ArtistCover = styled.img`
    height: 100px;
    width: 100px;
    border-color: none;
    border-radius: 100%;
`

const RelatedArtistsContainer = styled.div`
    margin: 15px;
`

const Artist = styled(Item)`
    display: flex;
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Helvetica;
`

const Music = styled(Item)`
    display: flex;
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Helvetica;
`

const ItemSeparator = styled.p`
    font-size: 1em;
    border-bottom: 1px solid #aaa;
`

const Country = styled.span`
    font-size: 0.7em;
    color: rgb(60,60,60);
`
const Description = styled.label`
    font-size: 0.6em;
    color: #ccc;
`

const Albums = styled(Item)`
    display: flex;
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Helvetica;
`

const AlbumsWrapper = styled.div`
    padding: 0 15px;
`

class ArtistPage extends Component {
    renderArtistResults = (results) => {  
        
        return (
            <RelatedArtistsContainer>
                <ItemSeparator>Related</ItemSeparator>
                {
                    results.map((element, index) => (
                        <Artist                         
                            name={element.collectionName}
                            genre={element.primaryGenreName}
                            artist={element.artistName}
                            key={index} />                    
                    )) 
                }
            </RelatedArtistsContainer>
        )        
    }

    renderAlbumMusics = (element, index) => element.map((music, index) => (
        <Music 
            hasPlayer
            name={music.trackName}
            artist={music.artistName}
            audio={music.previewUrl}
            img={music.artworkUrl100}
            key={`music-${index}`} />
    ))   

    renderArtistAlbunsResults = (results, pushCurrentArtist, pushRelatedArtists, pushCurrentArtistAlbums) => {    
        return results.map((element, index) => {
            return (
                <AlbumsWrapper key={index}>
                    <ItemSeparator>{element.album.collectionName}</ItemSeparator>
                    {this.renderAlbumMusics(element.musics, index)}
                </AlbumsWrapper>                            
            )
        }) 
    }

    renderRelatedArtists (relatedArtists) {
        return relatedArtists.results.length ? this.renderArtistResults(relatedArtists.results) : null
    } 
    
    renderArtistAlbums (artistsAlbums) {
        return artistsAlbums.length ? this.renderArtistAlbunsResults(artistsAlbums) : null
    }   

    render() { 

        return (
            <ArtistContent>
                
                <ItemContext.Consumer>
                        {({currentArtist}) => (
                            <ArtistDescriptionWrapper>
                                <React.Fragment>
                                    <ArtistCover src={currentArtist.artworkUrl100}/>
                                    <ArtistDescription>
                                        <ArtistName>{currentArtist.artistName}</ArtistName>                                    
                                        <ArtistGenre>{currentArtist.primaryGenreName}</ArtistGenre>
                                        <Country>{currentArtist.country}</Country>                                        
                                    </ArtistDescription>
                                </React.Fragment>
                           </ArtistDescriptionWrapper>
                        )}
                </ItemContext.Consumer>
                <ItemContext.Consumer>
                        {({currentArtistAlbums}) => (
                           this.renderArtistAlbums(currentArtistAlbums)
                        )}
                </ItemContext.Consumer>
                <ItemContext.Consumer>
                        {({relatedArtists}) => (
                           this.renderRelatedArtists(relatedArtists)
                        )}
                </ItemContext.Consumer>               
            </ArtistContent>
        );
    }
}

export default ArtistPage