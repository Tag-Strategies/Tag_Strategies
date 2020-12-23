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
  }

  onSelect = (selectedList) => {
    this.setState({
      selectedPoliticians: selectedList
    })
  };
 
  onRemove = (selectedList, removedPolitician) => {
    this.setState({selectedPoliticians: selectedList})
    this.props.update(this.state.selectedPoliticians)
  };

  updateOptions = (eventKeyboardInputCharacters) => {
    if (eventKeyboardInputCharacters.length >= 3){
      fetchPoliticians(eventKeyboardInputCharacters)
      .then(queriedListOfPoliticians => {
          this.setState({
            politicians: queriedListOfPoliticians
          })
        }
      )
    };
  }

  resetValues = () => {
    // By calling the belowe method will reset the selected values programatically
    this.multiselectRef.current.resetSelectedValues();
    console.log('restarted')
  }

  scrollDown = () => {
    this.props.update(this.state.selectedPoliticians)
    var element = document.getElementById("mapinmapjs");
    element.scrollIntoView({behavior: "smooth"});
  }

  render() {
    return (
      <div className='row search-container no-gutters'> 
        <div className='col-8'>
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
            displayValue={"name"}>
          </Multiselect>
        </div>
        <div className='searchbar-spacer'></div>
        <div className='col-3 button-container'>
          <Button className='row no-gutters' id='get-started' onClick={() => this.scrollDown()} variant="primary">
            <div className="col" id='get-started-text'>GET STARTED</div>
          </Button>
        </div>
      </div>
    )
  }
}