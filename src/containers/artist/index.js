import React, { Component } from 'react';

import styled from 'styled-components';

const ArtistContent = styled.section`
    min-height: 100vh;
`

class ArtistPage extends Component {
    state = {  }
    render() { 

        return (
            <ArtistContent>
                <h1>Artist Name!</h1>
            </ArtistContent>
        );
    }
}

export default ArtistPage