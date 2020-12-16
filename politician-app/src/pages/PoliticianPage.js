import React, { Component } from 'react'
import '../style/PoliticianPage.css'
import Map from '../components/Map'
import CapitolPvg from '../components/CapitolPng'
import DataCarousel from "../components/DataCarousel";

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
        <div className="row data-carousel-container">
          <div className="col">
            <div className="row data-carousel">
              <DataCarousel />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PoliticianPage