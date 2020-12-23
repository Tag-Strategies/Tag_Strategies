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
      colors: '#000000, #d12e28, #121212',
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
      }
  }).trigonsAnimInit({
      animOrder: 'in-out',
      animIn: 'effect3-top',
      delayIn: 0,
      durationIn: 3000,
      easeIn : 'bounce-in',
      animOut: 'effect3-right',
      delayOut: 0,
      durationOut: 800,
      easeOut: 'cubic-in',
      eventOn: '#capitol',
      eventType: 'hover',
      eventRepeat: false,
      viewportShift: 'full',
      beforeAnim: function () {
          console.log('before animation');
      },
      afterAnim: function () {
          console.log('after animation');
      }
  });
  }

  render() {
    return (
      <div className='row no-gutters svg-wrapper'>
        <div className='col image-wrapper'>
          <img id='capitol' src={backgroundImage} alt='Washington, DC' />
          <div id='triangles'>
          </div>
          <TagHeader />
        </div>
      </div>
    )
  }
}