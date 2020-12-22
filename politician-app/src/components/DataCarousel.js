import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';
import '../style/DataCarousel.css'

class DataCarousel extends Component {

  shouldComponentUpdate(nextProps){
    if (nextProps.politicians){
      return nextProps.politicians !== this.props.politicians;
    }
  }

  componentDidUpdate(props){
      // Desired operations: ex setting state
      console.log('Data Carousel Updated [cards] DC ln 15')
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
      })));
    }
    return (
      <ReactCardCarousel className='row data-carousel' spread='wide' autoplay={ false } autoplay_speed={ 2500 }>
        {Object.entries(dictionary).map(([key, value]) => (
          <div className={`container-fluid politician-card ${value.party.toLowerCase()}`} id={`${value.name}`} key={key}  onClick={() => this.props.fly(value.lat, value.lon)}>
            <div className='row'>
              <div className='col'>
                <h2>{value.name}</h2>
              </div>
            </div>
            <div className='row'>
              <div className='col-2'>
                Party: {value.party}
              </div>
              <div className='col-3'>
                FEC ID: {value.id}
              </div>
              <div className='col-2'>
                State: {value.state}
              </div>
              <div className='col-2'>
                Lat: {value.lat}
              </div>
              <div className='col-3'>
                Lon: {value.lon}
              </div>
            </div>
          </div>
        ))}
      </ReactCardCarousel>
    );
  }
}

export default DataCarousel;