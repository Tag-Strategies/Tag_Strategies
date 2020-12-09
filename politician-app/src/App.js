import './App.css';
import { BrowserRouter, Route } from "react-router-dom"
import HomePage from './pages/HomePage.js'
import PoliticianPage from './pages/PoliticianPage.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={HomePage}></Route>
        <Route exact path='/politician' component={PoliticianPage}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
