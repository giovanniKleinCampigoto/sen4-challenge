import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo/logo.svg'


const StyledHeader = styled.section`
    width: 100vw;
    height: 70px;
    border-bottom: 1px solid #ccc;
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
    animation: spin 10s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
    }
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

