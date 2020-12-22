import React, { Component } from 'react'
import '../style/PoliticianPage.css'
import Map from '../components/Map'
import CapitolPvg from '../components/CapitolPng'
import DataCarousel from "../components/DataCarousel";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
import StateCapitals from "../components/ComponentScripts/StateCapitals.json"

class PoliticianPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoliticians : [],
    };
  }

  componentDidMount(){
  }

  getLat = (state) => {
    for ( let i = 0; i < StateCapitals['states'].length; i++){
      if (state === StateCapitals['states'][i]['abbr']){
        return StateCapitals['states'][i]['lat']
      }
    }
  }

  getLon = (state) => {
    for ( let i = 0; i < StateCapitals['states'].length; i++){
      if (state === StateCapitals['states'][i]['abbr']){
        return StateCapitals['states'][i]['long']
      }
    }
  }

  SelectedPoliticiansHandler = (dropdownSelection) => {
    let dropdownSelectionArray = []
    for (let i=0 ; i < dropdownSelection.length; i++){
      let politicianName = dropdownSelection[i]['name']
      let politicianParty = dropdownSelection[i]['party']
      let politicianId = dropdownSelection[i]['candidate_id']
      let politicianState = dropdownSelection[i]['state']
      dropdownSelectionArray.push({
        politicianName : politicianName,
        politicianParty : politicianParty,
        politicianId : politicianId,
        politicianState : politicianState,
        lat : this.getLat(politicianState),
        lon : this.getLon(politicianState)
      })
    }
    this.setState({
      selectedPoliticians: dropdownSelectionArray,
    })
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className='row no-padding multicontainer'>
          <div>
            <CapitolPvg />
            <MultiSelectDropDown update={(dropdownSelection) => this.SelectedPoliticiansHandler(dropdownSelection)}/>
          </div>
        </div>
        <div className='row'>
          <div className='col map-div'>
            <Map politicians={this.state.selectedPoliticians} StateCapitals={StateCapitals}/>
          </div>
        </div>
        <div className="row data-carousel-container" >
          <div className="col">
            <div className="row data-carousel">
              <DataCarousel politicians={this.state.selectedPoliticians} StateCapitals={StateCapitals}/>
            </div>
            <div className="row">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PoliticianPage