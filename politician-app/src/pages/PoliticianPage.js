import React, { Component } from 'react'
import '../App.css';
import { Helmet } from "react-helmet";
import mapboxgl from 'mapbox-gl';
class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
    lng: -98,
    lat: 39,
    zoom: 2.75
    };
  }

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJzdHlsc2tpZXIiLCJhIjoiY2swd2p5OXZhMGdidDNlcGZzYXI2N3RrdSJ9.MY-V2IlbfRAWSEAIdXmhlA';
    this.map = new mapboxgl.Map({
    container: this.mapContainer,
    style: 'mapbox://styles/frstylskier/ckii5rg401dyh1ao2ynen1o35',
    center: [this.state.lng, this.state.lat],
    zoom: this.state.zoom
    });
  }

  _Update() {
    console.log("this.map")
    this.map.on('move', () => {
      this.setState({
      lng: this.map.getCenter().lng.toFixed(4),
      lat: this.map.getCenter().lat.toFixed(4),
      zoom: this.map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <div className="combo-box-div">
        <Helmet>
          <title>Map</title>
        </Helmet>
        <div className='container'>
          <h1>TAG Political Finance Map</h1>
          <div className='row'>
            <div className='col' onMouseOver={ () => {this._Update()}} id="chartdiv" ref={el => this.mapContainer = el}></div>
            <div className='col'>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Map