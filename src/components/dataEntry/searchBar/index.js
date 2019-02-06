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
    top: 10px;
    right: 25px;
    color: #ccc;
    font-size: 1.1em;
`
const SearchBarInput = styled(Input)`
    width: ${props => props.width ? props.width : '70px'};
    transition: width .5s ease-in-out;    
`

const InfiniteSpinner = styled(Icon)`
    position: absolute;
    top: 10px;
    right: 25px;
    color: #ccc;
    font-size: 1.1em;
    animation: spin 2s linear infinite;
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% {  transform: rotate(359deg); }
    }
      
`

class SearchBar extends Component {
    state = { 
        shrink: true,
        previousSearch: "",
        loading: false
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

    
    debounce (value) {        
        // Need to improve...
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.search(value.trim())
        }, 500);
    }

    search = async (value) => {  
        const { props: { service }, props, state: { previousSearch } } = this;

        if (value === previousSearch) return
    
        try {
            this.setState({
                loading: true
            })

            const response = await service(value);

            this.setState({
                previousSearch: value,
                loading: false
            }, () => props.results(response.data));
        } catch (e) {
            this.setState({
                loading: false
            })
            console.error(e);
        }
    }

    render() {
        const { shrink } = this.state;

        return (
            <SearchBarWrapper width={shrink ? '125px' : '290px'}>
                <SearchBarInput
                    width={shrink ? '90px' : '270px'}
                    placeholder="Search..."
                    onKeyDown={e => this.debounce(e.target.value)}
                    onFocus={() => this.increaseSize()}
                    onBlur={() => this.decreaseSize()}/>
                {this.state.loading ? <InfiniteSpinner icon="spinner9"/> : <SearchIcon icon="search"/>}
            </SearchBarWrapper>
        );
    }
}

export default SearchBar;
