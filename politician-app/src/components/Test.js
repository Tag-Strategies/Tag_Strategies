import React from 'react'

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state : 'n/a'
    };
  }

  componentDidMount() {
    const census = require("citysdk")

    census(
      {
        vintage: "2015", // required
        geoHierarchy: {
          // required
          state: {
            lat: 28.2639,
            lng: -80.7214
          },
          county: "*" // <- syntax = "<descendant>" : "*"
        }
      },
      
      (err, res) => {
        this.setState({state: res.geoHierarchy.state});
        console.log(res.geoHierarchy.state);
      }
    )
  }

  render() {
    return (
      <div> 
        <p>State: {this.state.state}</p>
      </div>
    )
  }
}