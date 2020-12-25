import React from 'react'
import Particles from 'react-particles-js';
import '../style/ParticlesAnimaion.css'

 
export default class ParticlesAnimation extends React.Component{
  render(){
    return (
        <Particles id='particles'
            params={{
                particles: {
                    shape: {
                        type: 'images',
                        image: [
                            {src: '../components/images/Hamburger_icon.svg', height: 20, width: 20},
                            {src: '../components/images/Hamburger_icon.svg', height: 20, width: 20},
                        ]
                    }
                }
            }} />
    );
};
}