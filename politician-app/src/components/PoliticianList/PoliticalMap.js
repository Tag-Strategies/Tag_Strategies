import React, { Component } from 'react';
// import "core-js/stable";
// import "regenerator-runtime/runtime";
import '../../App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_region_usa_congressional_usaCongressionalLow from "@amcharts/amcharts4-geodata/usaLow";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);

export class PoliticalMap extends Component {
  componentDidMount() {
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    // Set map definition
    chart.geodata = am4geodata_region_usa_congressional_usaCongressionalLow;
    // Set projection
    chart.projection = new am4maps.projections.AlbersUsa();
    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("darkred");
    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    polygonTemplate.events.on("hit", function(ev) {
      if (ev.target.dataItem.dataContext.id) {
        let nextMap = ev.target.dataItem.dataContext.id.split('-')
        console.log(nextMap)
        let chart = ev.target.series.chart;
        setTimeout(function() {
          // chart.geodata = x.;
          chart.zoomToMapObject(ev.target);
          console.log(chart.geodata)
          // chart.goHome(0);
        }, chart.zoomDuration + 100);
      }
    });
    
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}

export default PoliticalMap;