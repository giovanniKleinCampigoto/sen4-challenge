import React from 'react';
import styled from 'styled-components';

import Player from '../player/index';

const ItemWrapper = styled.div`
`

const Description = styled.div`
    padding: 0 15px;
`
const Item = ({ className, name, artist, img, audio }) => (
    <ItemWrapper className={className}>
        <img src={img}/>
        <Description>
            <p>{name}</p>
            <p>{artist}</p>
        </Description>
        <Player audio={audio}/>
    </ItemWrapper>
)

export default Item;