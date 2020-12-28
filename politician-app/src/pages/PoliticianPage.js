import React, { Component } from 'react'
import '../style/PoliticianPage.css'
import '../style/PoliticianPage.scss'
import Map from '../components/Map'
import CapitolPvg from '../components/CapitolPng'
import DataCarousel from "../components/DataCarousel";
import MultiSelectDropDown from "../components/MultiSelectDropDown";
import Sidebar from "../components/Sidebar";
import StateCapitals from "../components/ComponentScripts/StateCapitals.json"
import mapboxgl from 'mapbox-gl';
import Button from 'react-bootstrap/Button'

class PoliticianPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoliticians : [],
      lon: -98,
      lat: 30,
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
      pitchWithRotate: true,
    });
    
    // this.map.scrollZoom.disable();
    this.map.doubleClickZoom.disable();

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('move', () => {
        this.setState({
            lon: this.map.getCenter().lng.toFixed(4),
            lat: this.map.getCenter().lat.toFixed(4),
            zoom: this.map.getZoom().toFixed(2),
            pitch: this.map.getPitch().toFixed(2),
            bearing: this.map.getBearing().toFixed(2),
        });
        // console.log(this.map.style.layers)
    });

    this.map.on("load", () => {
      this.map.addLayer({
        id: "counties",
        type: "fill",
        source: {
          type: "vector",
          tiles: [
            "https://gis-server.data.census.gov/arcgis/rest/services/Hosted/VT_2017_050_00_PY_D1/VectorTileServer/tile/{z}/{y}/{x}.pbf"
          ]
        },
        "source-layer": "County",
        paint: {
          "fill-opacity": 0.1,
          "fill-color": "blue"
        }
      });

    });

    this.map.on('mousemove', (e) => {
      var features = this.map.queryRenderedFeatures(e.point);
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
      document.getElementById('stats').innerHTML = JSON.stringify(
        displayFeatures,
        null,
        2
      );
    });

      // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      anchor: 'right',
      className: 'popup'
    });
    
    this.map.on('click', 'districts', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
      for (let i = 0; i < e.features.length; i++){
        if (e.features[i].properties.NAMELSAD){
          var description = e.features[i].properties.NAMELSAD;
          var coordinates = [e.features[i].properties.INTPTLON, e.features[i].properties.INTPTLAT];
        }
        else {
          var description = "None...";
          var coordinates = [-91, 30]
        }
      }
      popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      this.flyTo(coordinates[1], coordinates[0])
    });
  };

  flyTo = (lat, lon) => {
    if (lat === undefined | lon === undefined){
      this.map.flyTo({
        center: [-98, 30],
        zoom: 3.5,
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

  resetView = () => {
    this.map.flyTo({
      center: [-98, 30],
      zoom: 3.5,
      pitch: 0,
      bearing: 0,
      essential: true
    });
    var element = document.getElementById("mapinmapjs");
    element.scrollIntoView({behavior: "smooth"});
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
          <Map initialize={(container) => this.initializeMap(container)}/>
          <div className='stats' id='stats' >xxxx</div>
          <div className="row no-gutters data-carousel-container" >
            <div className="data-carousel">
              <DataCarousel politicians={this.state.selectedPoliticians} StateCapitals={StateCapitals}  fly={(lat, lon) => this.flyTo(lat, lon)}/>
            </div>
          </div>
        </div>
        <div className='row' id='spacer2'>
          <Button variant="primary" onClick={() => this.resetView()}>Reset View</Button>
        </div>
        {/* <div id="particles-js">
          <ParticlesAnimation />
        </div> */}
      </div>
    )
  }
}

export default PoliticianPage