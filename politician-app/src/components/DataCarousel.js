import React, { Component } from 'react';
import ReactCardCarousel from 'react-card-carousel';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 3,
    },
  ],
}

class DataCarousel extends Component {

  static get CARD_STYLE() {
    return {
      height: '400px',
      width: '600px',
      paddingTop: '40px',
      textAlign: 'center',
      background: 'red',
      color: '#FFF',
      fontSize: '12px',
      textTransform: 'uppercase',
      borderRadius: '10px',
      // transform: "translateY(-200px)"
    };
  }

  

  render() {
    return (
      <ReactCardCarousel className='row' spread='wide' autoplay={ false } autoplay_speed={ 2500 }>
        <div className='col' style={ DataCarousel.CARD_STYLE }>
          <Doughnut data={data} />
        </div>
        <div className='col' style={ DataCarousel.CARD_STYLE }>
          Second Card
        </div>
        <div className='col' style={ DataCarousel.CARD_STYLE }>
          Third Card
        </div>
        <div className='col' style={ DataCarousel.CARD_STYLE }>
          Fourth Card
        </div>
        <div className='col' style={ DataCarousel.CARD_STYLE }>
          Fifth Card
        </div>
      </ReactCardCarousel>
    );
  }
}

export default DataCarousel;