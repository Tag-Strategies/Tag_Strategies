import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';
import '../style/DataCarousel.css'
import CommitteeList from '../components/CommitteeList'

class DataCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCard: '',
      selectedCommittee: ''
    }
  }

  handleSelectedCard = (selectedCard) => {
    this.setState({
      selectedCard: selectedCard
    })
  }

  handleSelectedCommittee = (selectedCommittee) => {
    this.setState({
      selectedCommittee: selectedCommittee
    })
  }

  handleClick = (lat, lon, bearing, range, zoom, candidate_id, committee) => {
    this.props.fly(lat, lon, bearing, range, zoom)
    this.handleSelectedCard(candidate_id)
  }

  render() {
    let politicianList = this.props.politicians;
    let dictionary = []
    for (let i = 0; i < politicianList.length; i++){
      dictionary = Object.assign({}, politicianList.map((politician) => ({
        "id" : politician.politicianId,
        "name" : politician.politicianName,
        "party" : politician.politicianParty,
        "state" : politician.politicianState,
        "lat" : politician.lat,
        "lon" : politician.lon,
        "committee": this.state.selectedCommittee
      })));
    }
    return (
      <ReactCardCarousel className='row data-carousel' spread='wide' autoplay={ false } autoplay_speed={ 2500 }>
        {Object.entries(dictionary).map(([key, value]) => (
          <div className={`politician-card ${value.party ? value.party.toLowerCase() : 'n/a'}`} id={`${value.name}`} key={key}  onClick={() => this.handleClick(value.lat, value.lon, (value.lat ? 60 : 0), (value.lat ? 0 : 0), (value.lat ? 6 : 3.5), value.id, value.committee)}>
            <div className='row no-gutters'>
              <h2>{value.name}</h2>
            </div>
            <div className='row no-gutters'>
              <div className='col'>
                Party: {value.party}
              </div>
              <div className='col'>
                FEC ID: {value.id}
              </div>
              <div className='col'>
                State: {value.state}
              </div>
              <div className='col'>
                Lat: {value.lat}
              </div>
              <div className='col'>
                Lon: {value.lon}
              </div>
              <CommitteeList candidateId={value.id} updateSelectedCommittee={(committee)=> this.handleSelectedCommittee(committee)}/>
            </div>
          </div>
        ))}
      </ReactCardCarousel>
    );
  }
}

export default DataCarousel;