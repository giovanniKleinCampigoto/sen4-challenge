import React, { Component } from 'react';
import styled from 'styled-components';

class RadialProgress extends Component {
    state = { 
        normalizedRadius: this.props.radius - this.props.stroke * 2,
        circumference: this.state.normalizedRadius * 2 * Math.PI
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps, prevState)
    }

    render() {
        const { radius, stroke, progress } = this.props;
        const strokeDashoffset = this.state.circumference - progress / 100 * this.state.circumference;
      
        return (
          <svg
            height={radius * 2}
            width={radius * 2}
            >
            <circle
              stroke="white"
              fill="transparent"
              strokeWidth={ stroke }
              strokeDasharray={ this.state.circumference + ' ' + this.state.circumference }
              style={ { strokeDashoffset } }
              stroke-width={ stroke }
              r={ this.state.normalizedRadius }
              cx={ radius }
              cy={ radius }
              />
          </svg>
        );
      }
    
}


export default RadialProgress;