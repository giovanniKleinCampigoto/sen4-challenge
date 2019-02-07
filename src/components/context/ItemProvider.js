import React, { Component } from 'react';
import { ItemContext } from './ItemContext'

class ItemProvider extends Component {
    state = {
        currentArtist: [],
        returnedMusicResults: {
            results: []
        },
        returnedArtistResults: {
            results: []
        },
        relatedArtists: {
            results: []
        }
    }

    pushCurrentArtist = value => {
        this.setState({
            currentArtist: value
        })
    }

    pushRelatedArtists = value => {
        this.setState({
            relatedArtists: value
        })
    }

    pushArtistResults = (value) => {
        this.setState({
            returnedArtistResults: value
        })
    }

    pushMusicResults = (value) => {
        
        this.setState({
            returnedMusicResults: value
        })
    }

    render() {
        const value = {
            ...this.state, 
            pushCurrentArtist: this.pushCurrentArtist,
            pushArtistResults: this.pushArtistResults,
            pushMusicResults: this.pushMusicResults,
            pushRelatedArtists: this.pushRelatedArtists            
        }

        return (
            <ItemContext.Provider value={value}>
                {this.props.children}
            </ItemContext.Provider>
        )
    }
}


export default ItemProvider;