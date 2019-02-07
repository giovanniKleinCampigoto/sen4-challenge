import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from '../notfound'

const NotFoundWrapper = styled.section`
    width: inherit;
    min-height: 100vh;
`
class NotFound extends Component {
    render() {
        return (
            <Grid>
                <NotFoundWrapper>
                    <h1>Oops! Page not found!</h1>
                </NotFoundWrapper>
            </Grid>
        );
    }
}

export default NotFound;
