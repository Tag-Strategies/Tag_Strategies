import React, { Component } from 'react'
import '../App.css';
import { Helmet } from "react-helmet";
import { PoliticalMap } from '../components/PoliticianList/PoliticalMap.js'
import ComboBox from '../components/PoliticianList/ComboBox.js'

class HomePage extends Component {

  render() {
    return (
      <div className="combo-box-div">
        <Helmet>
          <title>HomePage</title>
        </Helmet>
        <h1>TAG Political Finance Tracker</h1>
        <ComboBox />
        <div id="chartdiv">
          <PoliticalMap />
        </div>
      </div>
    )
  }
}

export default HomePage