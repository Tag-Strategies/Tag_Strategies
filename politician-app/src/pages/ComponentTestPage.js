import React, { Component } from 'react'
import '../style/App.css';
import '../style/LocomotiveScroll.css';
import { Helmet } from "react-helmet";
import { PoliticalMap } from '../components/PoliticalMap.js'
import ComboBox from '../components/ComboBox.js'
import LocomotiveScroll from 'locomotive-scroll';
import Switch from '../components/Switch'
import Accordion from '../components/Accordian.js'
import PoliticianList from '../components/PoliticianList'
import Header from '../components/Header'
import Test from '../components/Test'
import TableDisplayContainer from '../components/TableDisplayContainer'



class ComponentTestPage extends Component {

  componentDidMount() {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('body'),
      smooth: true,
      direction: 'horizontal'
    });
    const target = document.querySelector('#chartdiv');
    scroll.scrollTo(target);
  }

  render() {
    return (
      <div className="combo-box-div">
        <Helmet>
          <title>Component Test Page</title>
        </Helmet>
        <Header />
        <ComboBox />
        <div id="chartdiv">
          <PoliticalMap />
        </div>
        <div className="locoscroll">
          <div data-scroll-section>
            <div data-scroll-section>
                <h1 data-scroll>Hey</h1>
                <p data-scroll>👋</p>
            </div>
            <div data-scroll-section>
                <h2 data-scroll data-scroll-speed="1">What's up?</h2>
                <p data-scroll data-scroll-speed="2">😬</p>
            </div>
            <Accordion />
              <Switch />
              <Switch />
              <PoliticianList />
          </div>
          <Test />
          <TableDisplayContainer />
        </div>
      </div>
    )
  }
}

export default ComponentTestPage