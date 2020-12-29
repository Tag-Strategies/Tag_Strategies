import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl';

import '../style/Map.css'
class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef()
    // this.handleGo = this.handleGo.bind(this);
    this.state = {
      // goto: this.props.goto,
      // districtgoto: this.props.goto,
      // go: () => this.go,
      // lon: -98,
      // lat: 30,
      // zoom: 3.5,
      // pitch: 0,
      // bearing: 0,
      // shouldReset: this.props.shouldUpdate,
    };
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

      
  
      // this.map.scrollZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.addControl(new mapboxgl.NavigationControl());
      // this.map.on('move', () => {
      //     this.setState({
      //         lon: this.map.getCenter().lng.toFixed(4),
      //         lat: this.map.getCenter().lat.toFixed(4),
      //         zoom: this.map.getZoom().toFixed(2),
      //         pitch: this.map.getPitch().toFixed(2),
      //         bearing: this.map.getBearing().toFixed(2),
      //     });
      //     // console.log(this.map.style.layers)
      // });
  
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
            description = "None...";
            coordinates = [-91, 30]
          }
        }
        popup.setLngLat(coordinates).setHTML(description).addTo(this.map);
        // this.fly([coordinates[1], coordinates[0]])
        this.setState({
          districtgoto : [coordinates[1], coordinates[0], 60, 0, 6]
        })
        this.districtfly()
      });

      this.fly = () => {
        this.map.flyTo({
          center: [this.state.goto[1], this.state.goto[0]-3], //subtract here to adjust fly to viewport
          pitch: this.state.goto[2],
          bearing: this.state.goto[3],//this.generateRandomInteger(20, -20),
          zoom: this.state.goto[4],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      }

      this.go = ([lon, lat, pitch, bearing, zoom]) => {
        console.log(lon, lat)
        this.map.flyTo({
          center: [parseInt(lat), parseInt(lon)-3], //subtract here to adjust fly to viewport
          pitch: pitch,
          bearing: bearing,//this.generateRandomInteger(20, -20),
          zoom: zoom,
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      }

      this.generateRandomInteger = (min, max) => {
        return Math.floor(min + Math.random()*(max + 1 - min))
      }

      this.districtfly = () => {
        this.map.flyTo({
          center: [this.state.districtgoto[1], this.state.districtgoto[0]-3], //subtract here to adjust fly to viewport
          pitch: this.state.districtgoto[2],
          bearing: this.state.districtgoto[3],//this.generateRandomInteger(20, -20),
          zoom: this.state.districtgoto[4],
          essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      }
    };
    
    // handleGo(gotoProps) {
    //   console.log("goto props updated: " + gotoProps);
    //   this.go(this.props.goto)
    // }
          // this.generateRandomInteger = (min, max) => {
          //   return Math.floor(min + Math.random()*(max + 1 - min))
          // }
    
          // this.resetView = () => {
          //   this.map.flyTo({
          //     center: [-98, 30],
          //     zoom: 3.5,
          //     pitch: 0,
          //     bearing: 0,
          //     essential: true
          //   });
          //   var element = document.getElementById("mapinmapjs");
          //   element.scrollIntoView({behavior: "smooth"});
          // }
    
    componentDidUpdate(prevProps) {
      console.log("Map component updated")
      this.go(this.props.goto)      // console.log("props " + this.props.goto)

      }

      // go = ([lat, lon, pitch, bearing, zoom]) => {
      //   this.map.flyTo({
      //     center: [lat, lon-3], //subtract here to adjust fly to viewport
      //     pitch: pitch,
      //     bearing: bearing,//this.generateRandomInteger(20, -20),
      //     zoom: zoom,
      //     essential: true // this animation is considered essential with respect to prefers-reduced-motion
      //   });
      // if (this.state.goto !== this.state.goto){
      //   this.setState({ 
      //     goto: this.props.goto
      //   });
      //   this.fly()
      // }
      
    // }
    // shouldComponentUpdate(){
    //   if (this.state.goto !== this.props.goto){
    //     console.log("needs to update")
    //     this.setState({
    //       goto : this.props.goto
    //     })
    //     this.fly()
    //     return true
    //   } else {
    //     return false
    //   }

    // }
    
    // componentWillReceiveProps(nextProps) {
    //   console.log(nextProps)
    //   if (this.state.goto !== nextProps.goto){
    //     // this.setState({ 
    //     //   // shouldReset: nextProps.shouldUpdate,
    //     //   goto: nextProps.goto
    //     // });
    //     this.fly()
    //   }

      // componentDidUpdate(prevProps, prevState) {
      //   if (prevState.pokemons !== this.state.pokemons) {
      //     console.log('pokemons state has changed.')
      //   }
      // }
      // if (this.state.cardlatlon !== nextProps.cardlatlon){
      //   this.setState({ 
      //     cardlatlon: nextProps.cardlatlon
      //   });
      //   console.log(this.state.goto)
      //   this.fly()
      // }
    // }

  render() {
    // this.handleGo(this.props.goto)
    return (
      <react-fragment>
        <div className='map-container row' id='mapinmapjs' ref={this.mapRef}>
        </div>
      </react-fragment>
    )
  }
}

export default Map

