import React from 'react';
import fetchCommittees from '../api/getCommittees'

class CommitteeList extends React.Component {

  componentDidMount() {
    this.committees = []
    fetchCommittees(this.props.candidateId)
      .then((data) => {
        for (let i = 0; i < data.length; i++){
          // data[i] ? this.committeeName = data[i]['name'] : this.committeeName = 'No Committees'
          // console.log(this.committeeName)
          this.committees[i] = data[i]? data[i] : [{}]

        }
      });
      console.log(this.committees)
  }

  componentDidUpdate(){
    
  }

  render() {
    // x = this.committees ? this.committees : []
    console.log(this.committees)
    return (
      <div>
        <div>
          {this.committees && this.committees.map(person => (
            <div>
              <a href='#'>{person.name}</a>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default CommitteeList;