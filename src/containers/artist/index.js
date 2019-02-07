import React, { Component } from 'react';

import styled from 'styled-components';

import { ItemContext } from '../../components/context/ItemContext';

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

`

const MusicBox = styled.div`
`

class ArtistPage extends Component {
    state = {  }
    render() { 

        return (
            <ArtistContent>
                <ItemContext.Consumer>
                        {({currentArtist}) => (
                            <ArtistDescriptionWrapper>
                                {console.log(currentArtist)}
                                <ArtistCover src={currentArtist.artworkUrl100}/>
                                <ArtistName>{currentArtist.collectionName}</ArtistName>
                           </ArtistDescriptionWrapper>
                        )}
                </ItemContext.Consumer>
            </ArtistContent>
        );
    }
}

export default ArtistPage