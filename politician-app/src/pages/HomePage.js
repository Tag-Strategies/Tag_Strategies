import React, { Component } from 'react'
import '../style/App.css';
import '../style/LocomotiveScroll.css';
import { Helmet } from "react-helmet";
import { PoliticalMap } from '../components/PoliticianList/PoliticalMap.js'
import ComboBox from '../components/PoliticianList/ComboBox.js'
import LocomotiveScroll from 'locomotive-scroll';
import Switch from '../components/PoliticianList/Switch'



class HomePage extends Component {

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
          <title>HomePage</title>
        </Helmet>
        <h1 >TAG Political Finance Tracker</h1>
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
            <Switch />
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage