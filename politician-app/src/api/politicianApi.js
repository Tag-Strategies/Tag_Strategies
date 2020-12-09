const fetchPoliticianById = (politicianID) => {
  return fetch("http://localhost:8000/api/politicians/").then(response => response.json())
}

const fetchPoliticians = () => {
  return fetch("http://localhost:8000/api/politicians/").then(response => response.json())
}

export default {
  fetchPoliticianById,
  fetchPoliticians
}