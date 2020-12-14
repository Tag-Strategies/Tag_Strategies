
import { BrowserRouter, Route } from "react-router-dom"
import ComponentTestPage from './pages/ComponentTestPage.js'
import PoliticianPage from './pages/PoliticianPage.js'
import './style/App.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={ComponentTestPage}></Route>
        <Route exact path='/politician' component={PoliticianPage}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
