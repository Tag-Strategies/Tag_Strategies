import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import fetchPoliticians from '../api/politicianApi.js'
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
      <div className='inside'>
        <Autocomplete
          multiple
          limitTags={2}
          id="name-combo-box"
          options={this.state.politicians}
          getOptionLabel={(option) => option.name}
          style={{ width: '100%',
          marginLeft: '0px',}}
          renderInput={(params) => <TextField {...params} label="Ex. Trump, Donald" variant="outlined" />}/>
      </div>
    )
  }
}

export default ComboBox;