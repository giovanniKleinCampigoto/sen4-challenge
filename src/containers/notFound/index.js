import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../components/general/icon';

import Grid from '../../components/layout/grid';


const NotFoundWrapper = styled.section`
    display: flex;
    justify-content: center;
    width: inherit;
    min-height: 100vh;
    font-size: 2em;
`
const NotFound  = ({props}) => (
    <Grid>
        <NotFoundWrapper>
            <h1>Oops! Page not found!</h1>
        </NotFoundWrapper>
    </Grid>
);

export default withRouter(NotFound);
