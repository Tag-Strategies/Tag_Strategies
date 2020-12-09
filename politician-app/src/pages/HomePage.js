import React, { Component } from 'react'
import politicianApi from '../api/politicianApi.js'
import PoliticianList from '../components/PoliticianList/PoliticianList.js'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../App.css';
import { Helmet } from "react-helmet";
import { PoliticalMap } from '../components/PoliticianList/CongressMap.js'

class HomePage extends Component {

  state = {
    politicians : []
  }

  componentDidMount() {
    politicianApi.fetchPoliticians()
    .then(nameList => {
        this.setState({
          politicians: nameList
        })
      }
    )
  }
  

  render() {
    return (
      <div className="combo-box-div">
        <Helmet>
          <title>HomePage</title>
          <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
          <script src="https://cdn.amcharts.com/lib/4/charts.js"></script>
        </Helmet>
        <h1>Home Page</h1>
        <div className='inside'>
          <Autocomplete
            id="name-combo-box"
            options={this.state.politicians}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
          />
        </div>
        <div id="chartdiv">
          <PoliticalMap />
        </div>
      </div>
    )
  }
}

export default HomePage