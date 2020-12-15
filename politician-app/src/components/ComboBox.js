import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import fetchPoliticians from '../api/politicianApi.js'
import '../style/ComboBox.css'
class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      politicians : []
    };
  };

  componentDidMount() {
    fetchPoliticians()
    .then(nameList => {
        this.setState({
          politicians: nameList
        })
      }
    )
  }
  
  render() {
    return (
      <div className='col'>
        <h1 id='title'>CAMPAIGN CASH MAP</h1>
        <Autocomplete
          multiple
          limitTags={2}
          id="name-combo-box"
          options={this.state.politicians}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField id='combo-textfield' {...params} label="Ex. Trump, Donald" variant="filled" />}/>
      </div>
    )
  }
}

export default ComboBox;