import backgroundImage from './images/method-draw-image.svg'
import React from 'react'
import '../style/CapitolPng.css'
import TagHeader from '../components/TagHeader'

export default class CapitolPng extends React.Component{
  render() {
    return (
      <div className='row no-gutters svg-wrapper'>
        <div className='col image-wrapper'>
          <img id='capitol' src={backgroundImage} alt='Washington, DC' />
          <div className='row no-gutters' id='combo-box'>
          </div>
          <TagHeader />
        </div>
      </div>
    )
  }
}