
const fetchPoliticians = (eventKeyboardInputCharacters) => {
  // console.log('fetching names')
  return fetch(`http://localhost:8000/api/politicians/?filter=${eventKeyboardInputCharacters}`).then(response => response.json())
}

export default fetchPoliticians 
