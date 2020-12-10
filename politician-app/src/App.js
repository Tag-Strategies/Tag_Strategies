import './App.css';
import { BrowserRouter, Route } from "react-router-dom"
import HomePage from './pages/HomePage.js'
import PoliticianPage from './pages/PoliticianPage.js'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);





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
