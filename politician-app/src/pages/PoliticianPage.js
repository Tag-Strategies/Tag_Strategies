import React, { Component } from 'react'
import '../style/PoliticianPage.css'
// import { Helmet } from "react-helmet";
import Map from '../components/Map'
import Header from '../components/Header'
import CapitolPvg from '../components/CapitolPng'
import MultiSelectDropDown from '../components/MultiSelectDropDown'

class PoliticianPage extends Component {

  render() {
    return (
      <div className='container-fluid'>
        <div className='row no-gutters'>
          <div className='col no-gutters'>
            <div>
              <Header />
              <CapitolPvg />
            </div>
          </div>
        </div>
        <div>
          <div id='spacer' className='no-padding no-margin'></div>
        </div>
        <div className='row no-gutters'>
          <div className='col no-gutters'>
            <div>
              <Map />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PoliticianPage