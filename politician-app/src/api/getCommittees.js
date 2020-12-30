
const fetchCommittees = (candidate_id) => {
  console.log('fetching committees')
  return fetch(`http://localhost:8000/api/politicians/committees/?filter=${candidate_id}`).then(response => response.json())
}

export default fetchCommittees 
