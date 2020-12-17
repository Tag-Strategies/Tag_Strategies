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
      selectedPoliticians: [],
    };
    this.multiselectRef = React.createRef();
    this.updateOptions = this.updateOptions.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.getValues = this.getValues.bind(this);
  }

  componentDidMount() {
    fetchPoliticians('fadsfadf')
    .then(nameList => {
        this.setState({
          politicians: nameList
        })
      }
    )
  };

  onSelect(selectedList, selectedItem) {
    this.setState({
      selectedPoliticians: selectedList
    })
  };
 
  onRemove(selectedList, removedItem) {
    this.setState({selectedPoliticians: selectedList})
  };

  getValues(e) {
    console.log(this.state.selectedPoliticians)
  };

  updateOptions(e){
    if (e.length >= 3){
      fetchPoliticians(e)
      .then(nameList => {
          this.setState({
            politicians: nameList
          })
        }
      )
    };
  }

  resetValues() {
    // By calling the belowe method will reset the selected values programatically
    this.multiselectRef.current.resetSelectedValues();
  }

  render() {
    return (
      <div className='row no-gutters search-container'> 
        <div className='col-9'>
          <Multiselect
            options={this.state.politicians} // Options to display in the dropdown
            onSearch={this.updateOptions}
            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
            ref={this.multiselectRef}
            size={1}
            placeholder={'Type candidate name here'}
            onSelect={this.onSelect} // Function will trigger on select event
            onRemove={this.onRemove}
            loadingMessage={'Accessing Database'} // Function will trigger on remove event
            displayValue="name">
          </Multiselect>
        </div>
        <div className='searchbar-spacer'></div>
        <div className='col-2 button-container'>
          <Button className='row no-gutters' id='get-started' onClick={this.getValues} variant="primary">
            <div className="col" id='get-started-text'>GET STARTED</div>
          </Button>
        </div>
      </div>
    )
  }
}