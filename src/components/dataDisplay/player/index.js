import React, { Component } from 'react';

class Player extends Component {
    state = { 

    }

    playAudio = () => {
        let audio = new Audio(this.props.audio);
        audio.type = audio.type;
      
        let playPromise = audio.play();
      
        if (playPromise !== undefined) {
            playPromise.then(function () {
                console.log('Playing....');
            }).catch(function (error) {
                console.log('Failed to play....' + error);
            })
        }
    }

    pause = () => {
        let audio = new Audio(this.props.audio);
        audio.pause();
    }

    render() {
        return (
            <div>
                <span onClick={this.playAudio}>Play!</span>
                <span onClick={this.pause}>Pause!</span>
            </div>         
        );
    }
}

export default Player;