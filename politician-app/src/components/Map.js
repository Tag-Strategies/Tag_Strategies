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
    this.map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/frstylskier/ckiuj2g2j0q8c19qhf02fqe8q',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom,
    pitch: this.state.pitch,
    bearing: this.state.bearing,
    });
    this.map.scrollZoom.disable();
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('move', () => {
        this.setState({
            lng: this.map.getCenter().lng.toFixed(4),
            lat: this.map.getCenter().lat.toFixed(4),
            zoom: this.map.getZoom().toFixed(2),
            pitch: this.map.getPitch().toFixed(2),
            bearing: this.map.getBearing().toFixed(2),
        });
    }); 
  }

  render() {
    return (
      <react-fragment>
        <div className='row map-container' ref={el => this.mapContainer = el}>
        </div>
      </react-fragment>
    )
  }
}

export default Map