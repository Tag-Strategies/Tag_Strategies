import React from 'react';
import './style.scss';

const NameAndId = (props) => {
  let value = props.value;
  let firstName = "paul";
  let lastName = "ryan";
  console.log(value)
  //Setting up to get the API request
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.open.fec.gov/v1/candidates/search/?per_page=20&api_key=fDk8wXbxet3t4GuqnIa2I6TdlZBZnhy6GCEprEjj&sort=name&page=1&name=" + firstName + '%20' + lastName, false);
  xhr.send();
  //Setting up a variable to hold the response
  let response = xhr.response
  //parsing the response 
  let response_parsed = JSON.parse(response);

  return (
  <div className="fec">
    <div>{firstName} {lastName} {value}
    </div>
    <div>Candidate id: {response_parsed.results[0].candidate_id}
    </div>
  </div>
  )
}  

const Fec = () => {
return <NameAndId value={3} />;
 };

export default Fec