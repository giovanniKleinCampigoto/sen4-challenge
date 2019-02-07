import React, { Component } from 'react';
import { ItemContext } from './ItemContext'

class ItemProvider extends Component {
    state = {
        currentArtist: {},
        returnedResults: {
            results: []
        }
    }

    pushCurrentArtist = value => {
        this.setState({
            currentArtist: value
        })
    }

    pushResults = (value) => {
        
        this.setState({
            returnedResults: value
        })
    }

    render() {
        const value = {
            ...this.state, 
            pushCurrentArtist: this.pushCurrentArtist,
            pushResults: this.pushResults            
        }

        return (
            <ItemContext.Provider value={value}>
                {this.props.children}
            </ItemContext.Provider>
        )
    }
}


export default ItemProvider;