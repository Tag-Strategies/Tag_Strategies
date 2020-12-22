import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';
import '../style/DataCarousel.css'

class DataCarousel extends Component {

  render() {
    let politicianList = this.props.politicians;
    let dictionary = []
    for (let i = 0; i < politicianList.length; i++){
      dictionary = Object.assign({}, politicianList.map((x) => ({
        "id" : x.politicianId,
        "name" : x.politicianName,
        "party" : x.politicianParty,
      })));
    }
    return (
      <ReactCardCarousel className='row data-carousel' spread='wide' autoplay={ false } autoplay_speed={ 2500 }>
        {Object.entries(dictionary).map(([key, value]) => (
          <div className={`container-fluid politician-card ${value.party.toLowerCase()}`} id={`card${key}`} key={key} >
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
            </div>
          </div>
        ))}
      </ReactCardCarousel>
    );
  }
}

export default DataCarousel;