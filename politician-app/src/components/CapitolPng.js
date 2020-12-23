import backgroundImage from './images/method-draw-image.svg'
import React from 'react'
import '../style/CapitolPng.css'
import TagHeader from '../components/TagHeader'
const d3 = window.d3;

export default class CapitolPng extends React.Component{

  componentDidMount(){
    d3.select('#triangles').trigons({
      width: 1400,
      height: 1200,
      size: 90,
      offset: 0.3,
      colors: '#fff, #000, #901212',
      colorMode: 'build',
      colorBuild: 'build5',
      colorSpace: 'hcl',
      colorWay: .5,
      lightDark: 0,
      responsive: true,
      startVisible: true,
      beforeCreate:  function () {
          console.log('before create');

      },
      afterCreate:  function () {
          console.log('after create');
          var element = document.getElementById("capitol");
          element.scrollIntoView({behavior: "smooth"});
      }
  }).trigonsAnimInit({
      animOrder: 'in-out',
      animIn: 'effect1-left',
      delayIn: 2000,
      durationIn: 3000,
      easeIn : 'bounce-out',
      animOut: 'effect1-top',
      delayOut: 1000,
      durationOut: 1800,
      easeOut: 'cubic-in',
      eventOn: '#get-started',
      eventType: 'viewport',
      eventRepeat: true,
      viewportShift: 'full',
      beforeAnim: function () {
          console.log('before animation');
      },
      afterAnim: function () {
        console.log('after animation');
        // var element = document.getElementById("mapinmapjs");
        // element.scrollIntoView({behavior: "smooth"});
     }
  });
  }

  render() {
    return (
      <div className='row no-gutters svg-wrapper'>
        <div className='image-wrapper col'>
          <div className='col' id='triangle-wrapper'>
            <div id='triangles'>
            </div>
          </div>
          <img id='capitol' src={backgroundImage} alt='Washington, DC' />
          <TagHeader />
        </div>
      </div>
    )
  }
}