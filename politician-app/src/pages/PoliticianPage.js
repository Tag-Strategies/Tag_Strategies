import React, { Component } from 'react'
import '../style/PoliticianPage.css'
// import { Helmet } from "react-helmet";
import Map from '../components/Map'
import Header from '../components/Header'

class PoliticianPage extends Component {

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <Map />
        </div>
      </React.Fragment>
    )
  }
}

export default PoliticianPage