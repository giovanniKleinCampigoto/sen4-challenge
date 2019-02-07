import React from 'react';
import styled from 'styled-components';

import Player from '../player/index';

const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;    
    align-items: center;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const DescriptionAndImg = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
`

const Description = styled.div`
    padding: 0 15px;
    font-size: 0.7em;
`

const PreviewText = styled.span`
    font-size: 0.7em;
`

const Item = ({ className, genre, name, artist, img, audio, onClick, hasPlayer }) => (
    <ItemWrapper className={className}>
        <DescriptionAndImg onClick={onClick}>
            {img ? <Image src={img} alt={artist}/> : null}
            <Description>
                <p>{name}</p>
                <p>{artist}</p>
            </Description>
        </DescriptionAndImg>
        {genre ? <p>{genre}</p> : null}
        {hasPlayer ?
            (<div>
                <PreviewText>Preview</PreviewText>
                <Player audio={audio}/>
            </div>)
            : 
            null}
    </ItemWrapper>
)

export default Item;