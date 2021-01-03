
const fetchRepresentative = (lat, lon) => {
  console.log('fetching representative')
  return fetch(`http://localhost:8000/api/politicians/representative/?lat=${lat}&lon=${lon}`).then(response => response.json())
}

export default fetchRepresentative 