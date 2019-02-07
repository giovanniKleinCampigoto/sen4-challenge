import React, { Component } from 'react';

import styled from 'styled-components';

import { ItemContext } from '../../components/context/ItemContext';

import Item from '../../components/dataDisplay/item'

import SearchService from '../../services/searchService';

const ArtistContent = styled.section`
    display: flex;
    min-height: 100vh;
`

const ArtistDescriptionWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 200px;
`

const ArtistName = styled.h1`
    
`

const ArtistCover = styled.img`
    border-radius: 50%;
`

const MusicBox = styled.div`
`

const Artist = styled(Item)`
    display: flex;
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: Helvetica;
`

const ItemSeparator = styled.p`
    font-size: 2em;
    border-bottom: 1px solid #aaa;
`

class ArtistPage extends Component {
    

    renderArtistAlbuns = (element, index) => element.results.map((artist, artIndex) => (
        <Artist                         
            onClick={() => this.pushToArtistPage(element)}
            name={artist.collectionName}
            genre={artist.primaryGenreName}
            artist={artist.artistName}
            img={artist.artworkUrl100}
            key={`el-${index}-art-${artIndex}`} />
    ))   

    renderArtistResults = (results) => {    
        return results.map((element, index) => {
            return (
                <React.Fragment key={index}>
                    <ItemSeparator>Related</ItemSeparator>
                    {this.renderArtistAlbuns(element, index)}
                </React.Fragment>                            
            )
        }) 
    }

    renderRelatedArtists (relatedArtists) {
        console.log(relatedArtists)
        return relatedArtists.length ? this.renderArtistResults(relatedArtists) : null
    }

    render() { 

        return (
            <ArtistContent>
                
                <ItemContext.Consumer>
                        {({currentArtist}) => (
                            <ArtistDescriptionWrapper>
                                <React.Fragment>
                                    <ArtistCover src={currentArtist.artworkUrl100}/>
                                    <ArtistName>{currentArtist.artistName}</ArtistName>
                                </React.Fragment>
                           </ArtistDescriptionWrapper>
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