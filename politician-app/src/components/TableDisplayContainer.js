import React from 'react'

class SelectionBox extends React.Component {
  render() {
    return (
      <div className="filter">
        <label for="business">Filter by Status
          <select
            id="business"
            name="business"
            onChange={this.props.handleOnChange}
          >
              <option value="all">All Requests</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="denied">Denied</option>
          </select>
        </label>
      </div>
    );
  }
}

class TableDisplay extends React.Component {
  render() {
    // Do your filtering with this value
  

    return (
      <div className="wrapper">
        <h1>Requests</h1>
        <SelectionBox /> 
        <div><table className="table">
                <tr className="seperate"><td>Title</td><td>Status</td><td>Created</td><td>Updated</td><td>Delete</td></tr>
                <tr >
                  <td></td>
                </tr>;
              </table>
        </div>
      </div>
    );
  }
}
export default class TableDisplayContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      selectValue: 'all' // use this as default
    }
  }

  handleOnChange(e) {
    this.setState({
      selectValue: e.target.value
    });
  }

  render() {
    const {selectValue} = this.state;

    return (
      <div>
        <SelectionBox
          handleOnChange={this.handleOnChange.bind(this)}
        />
        <TableDisplay
          selectValue={selectValue}
        />
      </div>
    )
  }
}