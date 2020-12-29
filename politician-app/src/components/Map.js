import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';

import '../style/Map.css'
class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    let container = 'mapinmapjs'
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJzdHlsc2tpZXIiLCJhIjoiY2swd2p5OXZhMGdidDNlcGZzYXI2N3RrdSJ9.MY-V2IlbfRAWSEAIdXmhlA';
    this.map = new mapboxgl.Map({
      container: container,
      style: 'mapbox://styles/frstylskier/ckiuj2g2j0q8c19qhf02fqe8q',
      center: [-95, 30],
      zoom: 3.5,
      pitch: 0,
      bearing: 0,
      pitchWithRotate: true,
    });

    this.map.doubleClickZoom.disable();
    this.map.addControl(new mapboxgl.NavigationControl());

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
          description = "None...";
          coordinates = [-91, 30]
        }
      }
      popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
      this.go([(coordinates[1]*(1.02)), coordinates[0], 30, 0, 7])
    });

    this.go = ([lon, lat, pitch, bearing, zoom]) => {
      this.map.flyTo({
        center: [parseInt(lat), parseInt(lon)-1],
        pitch: pitch,
        bearing: (zoom < 5 ? 0: this.generateRandomInteger(-20, 20)),
        zoom: zoom,
        essential: true
      });
    }

    this.generateRandomInteger = (min, max) => {
      return Math.floor(min + Math.random()*(max + 1 - min))
    }

  };
    
  componentDidUpdate() {
    this.go(this.props.goto)
  }

  render() {
    return (
      <react-fragment>
        <div className='map-container row' id='mapinmapjs' ref={this.mapRef}>
        </div>
      </react-fragment>
    )
  }
}

export default Map

