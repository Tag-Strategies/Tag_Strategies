import React, { Component } from 'react'
import politicianApi from '../api/politicianApi.js'
import PoliticianList from '../components/PoliticianList/PoliticianList.js'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../App.css';

 

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
      </div>
    )
  }
}

export default HomePage