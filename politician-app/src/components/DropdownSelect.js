import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../style/DropdownSelect.css'


export default function SimpleSelect(props) {
  // const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  console.log(props.committees)

  return (
    <div className='col-12'>
      {props.committees !== [] && <FormControl className={"formControl"}>
        <InputLabel id="demo-simple-select-label">Committees</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          {props.committees.map(committee => (
            <MenuItem key={committee.committee_id} value={committee.committee_id}>{committee.name ? committee.name + ' -------- ' + committee.last_file_date : 'N/A' }</MenuItem>
          ))}
        </Select>
      </FormControl>}
    </div>
  );
}
