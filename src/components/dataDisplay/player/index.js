import React, { Component } from 'react';

import RadialProgress from '../radialProgress'

class Player extends Component {
    state = { 
        audio: new Audio(this.props.audio),
        progress: 0,
        playing: false
    }
    playAudio = () => {      
        const { state: { audio: { currentTime, duration } } } = this

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
                    playing: true
                })
                console.log('Playing....');
            }).catch(function (error) {
                console.log('Failed to play....' + error);
            })
        }
    }

    pause = () => {        
        let pausePromise = this.state.audio.pause();
      
        if (pausePromise !== undefined) {
            pausePromise.then(function () {
                console.log('Pausing....');
            }).catch(function (error) {
                console.log('Failed to pause....' + error);
            })
        }
    }

    calculateProgress = (currentTime, duration) => {
        return 100 - Math.round(currentTime * 100 / duration);
    }

    render() {
        
        
        return (
            <div>
                <span onClick={this.playAudio}>Play!</span>
                <span onClick={this.pause}>Pause!</span>
                <RadialProgress 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        radius={ 60 }
                    stroke={ 4 }
                    progress={this.state.progress} />
            </div>         
        );
    }
}

export default Player;