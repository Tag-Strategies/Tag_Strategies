import React, { Component } from 'react'
import '../style/PoliticianPage.css'
import Map from '../components/Map'
import CapitolPvg from '../components/CapitolPng'


class PoliticianPage extends Component {

  render() {
    return (
      <div className='container-fluid'>
        <div className='row no-padding'>
          <div>
            <CapitolPvg />
          </div>
        </div>
        <div className='row' >
          <div className='col spacer'></div>
        </div>
        <div className='row'>
          <div className='col map-div'>
            <Map />
          </div>
        </div>
      </div>
    )
  }
}

export default PoliticianPage