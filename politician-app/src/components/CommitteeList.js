import React from 'react';
import fetchCommittees from '../api/getCommittees'
import DropdownSelect from '../components/DropdownSelect'

class CommitteeList extends React.Component {


  componentDidMount() {
    this.committees = []
    fetchCommittees(this.props.candidateId)
      .then((data) => {
        for (let i = 0; i < data.length; i++){
          this.committees[i] = data[i]? data[i] : ''
        }
      });
  }

  render() {
    return (
      <div>
        {this.committees && this.committees[0] && 
          <div className='row' >
            <DropdownSelect committees={this.committees}/>
          </div>
        }
      </div>
    );
  }
}
export default CommitteeList;