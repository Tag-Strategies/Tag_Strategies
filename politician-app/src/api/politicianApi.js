
const fetchPoliticians = (e) => {
  console.log('fetching names')
  return fetch(`http://localhost:8000/api/politicians/?filter=${e}`).then(response => response.json())
}

export default fetchPoliticians 
