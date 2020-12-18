import React, { Component } from 'react';
import '../style/ElectionList.css'
import Trianglify from 'trianglify'




class ElectionList extends Component {
    constructor(props){
        super(props)
        this.state = {
            nextElections: []
        }
    }

    handleClick = () => {
   
    }

    componentDidMount(){
      var rn = Math.floor((Math.random() * 150) + 60);
      var rs = Math.floor((Math.random() * 11) + 4);
        var t = new Trianglify({
       x_gradient: Trianglify.colorbrewer.Spectral[rs],
          noiseIntensity: 0,
          cellsize: rn
      });
      var pattern = t.generate(window.innerWidth, window.innerWidth+200);
      document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);
    }


    render() {
        return (
            <div className='particles-js'>
              
            </div>
        );
    }
}

export default ElectionList;