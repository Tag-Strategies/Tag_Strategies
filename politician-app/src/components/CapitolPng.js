import backgroundImage from './capitol.png'
import React from 'react'
import '../style/CapitolPng.css'
import MultiSelectDropDown from '../components/MultiSelectDropDown'

export default class CapitolPng extends React.Component{
  render() {
    return (
      <div>
        <img id='capitol' src={backgroundImage} />
        <div id='combo-box'>
          <MultiSelectDropDown />
        </div>
      </div>
    )
  }
}