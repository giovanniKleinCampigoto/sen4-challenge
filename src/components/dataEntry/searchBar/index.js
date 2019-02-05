import React, { Component } from 'react';
import styled from 'styled-components';

import Input from '../input';
import Icon from '../../general/icon';

const SearchBarWrapper = styled.div`
    position: relative;
    width: ${props => props.width ? props.width : '125px' };
    transition: width .5s ease-in-out;
`
const SearchIcon = styled(Icon)`
    position: absolute;
    top: 17px;
    right: 20px;
    color: #ccc;
    font-size: 1.1em;
`
const SearchBarInput = styled(Input)`
    width: ${props => props.width ? props.width : '70px'};
    transition: width .5s ease-in-out;    
`

class SearchBar extends Component {
    state = { 
        shrink: true
    }

    increaseSize () {
        this.setState({
            shrink: false
        })
    }

    decreaseSize () {
        this.setState({
            shrink: true
        })
    }

    render() {
        const { shrink } = this.state;

        return (
            <SearchBarWrapper width={shrink ? '125px' : '290px'}>
                <SearchBarInput
                    width={shrink ? '90px' : '270px'}
                    placeholder="Search..."
                    onFocus={() => this.increaseSize()}
                    onBlur={() => this.decreaseSize()}/>
                <SearchIcon icon="search"/>
            </SearchBarWrapper>
        );
    }
}

export default SearchBar;
