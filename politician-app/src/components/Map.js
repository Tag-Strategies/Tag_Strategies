import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';
import '../style/Map.css'
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    lng: -98,
    lat: 39,
    zoom: 2.75,
    pitch: 0,
    bearing: 0,
    };
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJzdHlsc2tpZXIiLCJhIjoiY2swd2p5OXZhMGdidDNlcGZzYXI2N3RrdSJ9.MY-V2IlbfRAWSEAIdXmhlA';
    var map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/frstylskier/ckiuj2g2j0q8c19qhf02fqe8q',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom,
    pitch: this.state.pitch,
    bearing: this.state.bearing,
    });
    map.scrollZoom.disable();
    map.addControl(new mapboxgl.NavigationControl());
    map.on('move', () => {
        this.setState({
            lng: map.getCenter().lng.toFixed(4),
            lat: map.getCenter().lat.toFixed(4),
            zoom: map.getZoom().toFixed(2),
            pitch: map.getPitch().toFixed(2),
            bearing: map.getBearing().toFixed(2),
        });
    }); 
   
    // document.getElementById('card1').addEventListener('click', function () {
    //     map.flyTo({
    //         bearing: 27,
    //         center: [-91.420679, 31.772537],
    //         zoom: 6.5,
    //         pitch: 60,
    //         essential: true // this animation is considered essential with respect to prefers-reduced-motion
    //     });
    // });
  }

  render() {
    return (
      <react-fragment>
        <div className='row map-container' ref={el => this.mapContainer = el}>
        </div>
        <div className='row coordinate-box' >Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom} | Pitch: {this.state.pitch} | Bearing: {this.state.bearing}
        </div>
      </react-fragment>
    )
  }
}

export default Map