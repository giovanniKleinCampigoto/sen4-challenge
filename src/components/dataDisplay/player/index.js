import React, { Component } from 'react';
import styled from 'styled-components';

import RadialProgress from '../radialProgress';

import Icon from '../../general/icon';

const PlayerWrapper = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
`

const PlayerControls = styled(Icon)`
    position: absolute;
    color: #ccc;
    top: 0;
    top: 12px;
    left: 12px;
`

const LoadingText = styled.p`
    font-size: 0.7em;
    color: #ccc;
`

class Player extends Component {
    state = { 
        audio: new Audio(this.props.audio),
        progress: 0,
        status: "buffering"
    }

    componentDidMount() {
        const audio = this.state.audio;
        audio.addEventListener('progress', () => {
            let timeRanges = audio.buffered;
            if (timeRanges && timeRanges.length > 0) {
                this.setState({
                    status: "paused"
                })
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.audio !== this.props.audio) {

            this.setState({
                audio: new Audio(this.props.audio),
                progress: 0,
                status: "buffering"
            }, () => {
                const audio = this.state.audio;
                audio.addEventListener('progress', () => {
                    let timeRanges = audio.buffered;
                    if (timeRanges && timeRanges.length > 0) {
                        this.setState({
                            status: "paused"
                        })
                    }
                })
            })
        }
    }

    playAudio = () => {      

        let audio = this.state.audio;
        let playPromise = audio.play();        

        audio.addEventListener('timeupdate', () => {
            this.setState({
                progress: this.calculateProgress(audio.currentTime, audio.duration)
            })
        })

        if (playPromise !== undefined) {
            playPromise.then(() => {
                this.setState({
                    status: "playing"
                })
               
            }).catch(function (error) {
                console.log('Failed to play....' + error);
            })
        }
    }

    pause = () => {        
        this.state.audio.pause();

        this.setState({
            status: "paused"
        })
    }

    calculateProgress = (currentTime, duration) => {
        return Math.round(currentTime * 100 / duration);
    }

    render() {       
        
        return (
            <React.Fragment>
                {
                    this.state.status === "buffering" ?
                        <LoadingText>Loading...</LoadingText>
                    :
                    (
                        <PlayerWrapper onClick={() =>   this.state.status === "playing" ? this.pause() : this.playAudio()}>
                            {this.state.status === "playing" ? <PlayerControls icon="pause2" /> : <PlayerControls icon="play3"/>}
                            <RadialProgress 
                                radius={ 20 }
                                stroke={ 4 }
                                progress={this.state.progress} />
                        </PlayerWrapper>
                    )
                }
            </React.Fragment>         
        );
    }
}

export default Player;