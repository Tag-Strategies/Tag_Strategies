import React, { PropTypes } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
const axios = require('axios')

// const getNames = async () => {
//   try {
//     return await axios.get('http://localhost:8000/api/politicians/')
//   } catch (error) {
//     console.error(error)
//   }
// }

// const getPoliticianNames = async () => {
//   const politician = await getNames()
//   let nameList = []
//   if (politician.data) {
//     for (let i = 0; i < politician.data.length; i++){
//       nameList.push(politician.data[i]['name'])
//     }
//   return nameList
//   }
// }

const options = axios.get('http://localhost:8000/api/politicians/').then(function (response) {console.log(response.data)});


export default function ControllableStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  return (
    <div>
      <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
      />
    </div>
  );
}