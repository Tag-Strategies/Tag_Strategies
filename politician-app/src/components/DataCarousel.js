import React, { Component } from 'react';
// import ReactCardCarousel from 'react-card-carousel';
import ReactCardCarousel from 'react-card-carousel';
// import { Doughnut } from 'react-chartjs-2';
import '../style/DataCarousel.css'
// import MultiAxisLineChart from '../components/MultiAxisLineChart'

// const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth: 3,
//     },
//   ],
// }

class DataCarousel extends Component {

  componentDidMount() {
    // // console.log("props should print")
    // for (let i = 0; i < this.props.politicians.length; i++){
    //   console.log(this.props.politicians[i].name)
    // }
    // for (let i = 0; i < this.props.StateCapitals.states.length; i++){
    //   console.log(this.props.StateCapitals.states[i].name, this.props.StateCapitals.states[i].lat, this.props.StateCapitals.states[i].long)
    // }
    // console.log(this.props.politicians())
    
  }

  // static get CARD_STYLE() {
  //   return {
  //     height: '400px',
  //     width: '600px',
  //     paddingTop: '40px',
  //     textAlign: 'center',
  //     background: '#fff',
  //     color: '#121212',
  //     fontSize: '12px',
  //     textTransform: 'uppercase',
  //     borderRadius: '10px',
  //   };
  // }

  render() {
    console.log('this is cards:', this.props)
    let datas = this.props.politicians;
    // console.log(y)
    let dictionary = []
    for (let i = 0; i < datas.length; i++){
      dictionary = Object.assign({}, datas.map((x) => ({
        "id" : x.politicianId,
        "name" : x.politicianName,
        "party" : x.politicianParty,
      })));
    }
    console.log("dic", dictionary)
    return (
      <ReactCardCarousel className='row data-carousel' spread='wide' autoplay={ false } autoplay_speed={ 2500 }>
        {Object.entries(dictionary).map(([key, value]) => (
          <div className={`politician-card ${value.party.toLowerCase()}`} id={`card${key}`} key={key} >
            {value.name}<br />{value.party}<br />{value.id}
          </div>
        ))}
      </ReactCardCarousel>
    );
  }
}

export default DataCarousel;