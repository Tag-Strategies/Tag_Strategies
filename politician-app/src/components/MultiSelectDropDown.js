import React from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import fetchPoliticians from '../api/politicianApi.js'
import '../style/MultiSelectDropDown.css'
import { Button } from 'react-bootstrap';

export default class MultiSelectDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      politicians: [],
    };
    this.multiselectRef = React.createRef();
  }

  componentDidMount() {
    fetchPoliticians()
    .then(nameList => {
        this.setState({
          politicians: nameList
        })
      }
    )
  }

  onSelect(selectedList, selectedItem) {
      console.log(selectedList)
  }
 
  onRemove(selectedList, removedItem) {
      console.log(removedItem)
  }

  getValues() {
    // By calling the below method will get the selected values programatically
    // this.multiselectRef.current.getSelectedValues();
    console.log("Testing")
  }

  resetValues() {
    // By calling the belowe method will reset the selected values programatically
    this.multiselectRef.current.resetSelectedValues();
  }

  render() {
    return (
      <div className='row'> 
        <div className='col-8'>
          <Multiselect
            options={this.state.politicians} // Options to display in the dropdown
            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            ref={this.multiselectRef}
            onSelect={this.onSelect} // Function will trigger on select event
            onRemove={this.onRemove} // Function will trigger on remove event
            displayValue="name">
          </Multiselect>
        </div>
        <div className='col-4'>
          <Button id='get-started' onClick={this.getValues} variant="secondary" size="lg">
            Get Started
          </Button>
        </div>
      </div>
    )
  }
}