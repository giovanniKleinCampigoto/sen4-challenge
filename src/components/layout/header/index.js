import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo.svg'


const StyledHeader = styled.section`
    width: 100vw;
    height: 70px;
    background: red;
`

const Clickable = styled.a`
    display: flex;
    width: 250px;
    height: 70px;
    align-items: center;
    text-decoration: none;
    color: #000;
`

const Logo = styled.img`
    width: 50px;
    height: 50px;
    color: #000;
`
const Title = styled.h1`
    margin: 0;
    padding: 0;0
`

const Header = (props) => {
    return (
        <StyledHeader> 
            <Clickable href="/">
                <Logo src={logo}/>
                <Title>
                    Reactunes
                </Title>
            </Clickable>
        </StyledHeader>
    )   
}

export default Header;

