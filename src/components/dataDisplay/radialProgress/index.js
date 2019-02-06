import React, { Component } from 'react';
import styled from 'styled-components';


const Circle = styled.circle`
    transition: stroke-dash-offset .2s ease-in-out;
`
class RadialProgress extends Component {
    state = { 
        normalizedRadius: "",
        circumference: ""
    }

    componentDidMount() {
        this.setState({
            normalizedRadius: this.props.radius - this.props.stroke * 2,
            circumference: (this.props.radius - this.props.stroke * 2) * 2 * Math.PI
        })
    }

    render() {
        const { radius, stroke, progress } = this.props;
        let strokeDashoffset = this.state.circumference - progress / 100 * this.state.circumference; 

        return (
          <svg
            height={radius * 2}
            width={radius * 2}>
            <Circle
              stroke="green"
              fill="transparent"
              strokeWidth={ stroke }
              strokeDasharray={ this.state.circumference + ' ' + this.state.circumference }
              style={ { strokeDashoffset } }
              r={ this.state.normalizedRadius }
              cx={ radius }
              cy={ radius }
              />
          </svg>
        );
      }
    
}


export default RadialProgress;