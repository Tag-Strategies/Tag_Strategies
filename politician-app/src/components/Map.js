import React, { Component } from 'react'
import '../style/Map.css'
class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef()
  }

  componentDidMount() {
    this.props.initialize("mapinmapjs")
  };

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