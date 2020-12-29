import React, { Component } from 'react'
import '../style/PoliticianPage.css'
import '../style/PoliticianPage.scss'
import Map from '../components/Map'
import CapitolPvg from '../components/CapitolPng'
import DataCarousel from "../components/DataCarousel";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
import Sidebar from "../components/Sidebar";
import StateCapitals from "../components/ComponentScripts/StateCapitals.json"
import Button from 'react-bootstrap/Button'

class PoliticianPage extends Component {
  constructor(props) {
    super(props);
    this.handleFlyTo = this.handleFlyTo.bind(this);
    this.state = {
      selectedPoliticians : [],
      goto: [38,-98,0,0,4],
      // shouldUpdate: false,
    };
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

  handleFlyTo = (lat=38, lon=-98, pitch=0, bearing=0, zoom=3.5) => {
    console.log("setting state in politician page")
    this.setState({
      goto: [lat, lon, pitch, bearing, zoom],
      // shouldUpdate : !this.state.shouldUpdate
    })
  }


  render() {
    return (
      <div className='container-fluid' id='main-container'>
        <div id='triangle-background'>
        </div>
        <div className='row multicontainer'>
          <div className='sidebar-wrapper'>
            <Sidebar />
          </div>
          <CapitolPvg />
          <MultiSelectDropDown update={(dropdownSelection) => this.SelectedPoliticiansHandler(dropdownSelection)}/>
        </div>
        <div className='row' id='spacer'>
        </div>
        <div className=' map-div'>
          <Map goto={this.state.goto}/>
          <div className='stats' id='stats' >xxxx</div>
          <div className="row no-gutters data-carousel-container" >
            <div className="data-carousel">
              <DataCarousel politicians={this.state.selectedPoliticians} StateCapitals={StateCapitals}  fly={(lat, lon, pitch, bearing, zoom) => this.handleFlyTo(lat, lon, pitch, bearing, zoom)}/>
            </div>
          </div>
        </div>
        <div className='row' id='spacer2'>
          <Button variant="primary" onClick={() => this.handleFlyTo()}>Reset View</Button>
        </div>
      </div>
    )
  }
}

export default PoliticianPage