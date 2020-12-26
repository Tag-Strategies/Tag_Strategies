import React, { Component } from 'react'
import '../style/PoliticianPage.css'
import '../style/PoliticianPage.scss'
import Map from '../components/Map'
import CapitolPvg from '../components/CapitolPng'
import DataCarousel from "../components/DataCarousel";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
import Sidebar from "../components/Sidebar";
// import ParticlesAnimation from "../components/ParticlesAnimation";
import StateCapitals from "../components/ComponentScripts/StateCapitals.json"
import mapboxgl from 'mapbox-gl';

class PoliticianPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoliticians : [],
      lon: -91,
      lat: 33,
      zoom: 3.5,
      pitch: 0,
      bearing: 0,
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

  initializeMap = (container) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJzdHlsc2tpZXIiLCJhIjoiY2swd2p5OXZhMGdidDNlcGZzYXI2N3RrdSJ9.MY-V2IlbfRAWSEAIdXmhlA';
    this.map = new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/frstylskier/ckiuj2g2j0q8c19qhf02fqe8q',
      center: [this.state.lon, this.state.lat],
      zoom: this.state.zoom,
      pitch: this.state.pitch,
      bearing: this.state.bearing,
    });
    
    this.map.scrollZoom.disable();

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('move', () => {
        this.setState({
            lon: this.map.getCenter().lng.toFixed(4),
            lat: this.map.getCenter().lat.toFixed(4),
            zoom: this.map.getZoom().toFixed(2),
            pitch: this.map.getPitch().toFixed(2),
            bearing: this.map.getBearing().toFixed(2),
        });
        console.log(this.map.style.layers)
    });
    

    this.map.on('mousemove', (e) => {
      var features = this.map.queryRenderedFeatures(e.point);
       
      // Limit the number of properties we're displaying for
      // legibility and performance
      var displayProperties = [
      'type',
      'properties',
      'id',
      'layer',
      'source',
      'sourceLayer',
      'state'
      ];
       
      var displayFeatures = features.map(function (feat) {
      var displayFeat = {};
      displayProperties.forEach(function (prop) {
      displayFeat[prop] = feat[prop];
      });
      return displayFeat;
      });
       
      document.getElementById('spacer').innerHTML = JSON.stringify(
      displayFeatures,
      null,
      2
      );
    });
  //   this.map.on('load', () => {
  //     // Add a geojson point source.
  //     // Heatmap layers also work with a vector tile source.
  //     this.map.addSource('earthquakes', {
  //         'type': 'geojson',
  //         'data':
  //             'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
  //     });

  //     this.map.addLayer(
  //         {
  //             'id': 'earthquakes-heat',
  //             'type': 'heatmap',
  //             'source': 'earthquakes',
  //             'maxzoom': 9,
  //             'paint': {
  //                 // Increase the heatmap weight based on frequency and property magnitude
  //                 'heatmap-weight': [
  //                     'interpolate',
  //                     ['linear'],
  //                     ['get', 'mag'],
  //                     0,
  //                     0,
  //                     6,
  //                     1
  //                 ],
  //                 // Increase the heatmap color weight weight by zoom level
  //                 // heatmap-intensity is a multiplier on top of heatmap-weight
  //                 'heatmap-intensity': [
  //                     'interpolate',
  //                     ['linear'],
  //                     ['zoom'],
  //                     0,
  //                     1,
  //                     9,
  //                     3
  //                 ],
  //                 // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  //                 // Begin color ramp at 0-stop with a 0-transparancy color
  //                 // to create a blur-like effect.
  //                 'heatmap-color': [
  //                     'interpolate',
  //                     ['linear'],
  //                     ['heatmap-density'],
  //                     0,
  //                     'rgba(33,102,172,0)',
  //                     0.2,
  //                     'rgb(103,169,207)',
  //                     0.4,
  //                     'rgb(209,229,240)',
  //                     0.6,
  //                     'rgb(253,219,199)',
  //                     0.8,
  //                     'rgb(239,138,98)',
  //                     1,
  //                     'rgb(178,24,43)'
  //                 ],
  //                 // Adjust the heatmap radius by zoom level
  //                 'heatmap-radius': [
  //                     'interpolate',
  //                     ['linear'],
  //                     ['zoom'],
  //                     0,
  //                     2,
  //                     9,
  //                     20
  //                 ],
  //                 // Transition from heatmap to circle layer by zoom level
  //                 'heatmap-opacity': [
  //                     'interpolate',
  //                     ['linear'],
  //                     ['zoom'],
  //                     7,
  //                     1,
  //                     9,
  //                     0
  //                 ]
  //             }
  //         },
  //         'admin-0-boundary'
  //     )})
  };

  flyTo = (lat, lon) => {
    if (lat === undefined | lon === undefined){
      this.map.flyTo({
        center: [-91, 33],
        zoom: 4,
        pitch: 0,
        bearing: 0,
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
    else {
      this.map.flyTo({
        center: [lon, lat-3], //subtract here to adjust fly to viewport
        zoom: 7,
        pitch: 60,
        bearing: this.generateRandomInteger(20, -20),
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
  }

  generateRandomInteger = (min, max) => {
    return Math.floor(min + Math.random()*(max + 1 - min))
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
          <Map politicians={this.state.selectedPoliticians} StateCapitals={StateCapitals} initialize={(container) => this.initializeMap(container)}/>
          <div className="row no-gutters data-carousel-container" >
            <div className="data-carousel">
              <DataCarousel politicians={this.state.selectedPoliticians} StateCapitals={StateCapitals}  fly={(lat, lon) => this.flyTo(lat, lon)}/>
            </div>
          </div>
        </div>
        <div className='row' id='spacer2'>
        </div>
        {/* <div id="particles-js">
          <ParticlesAnimation />
        </div> */}
      </div>
    )
  }
}

export default PoliticianPage