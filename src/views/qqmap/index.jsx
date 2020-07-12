import React from "react"

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

import './style.scss'

export default class Test extends React.Component {

  componentDidMount() {


    const gaodeMapLayer = new TileLayer({
      source: new XYZ({
        url: 'http://rt1.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0'
      })
    });
    const map = new Map({
      target: 'map',
      layers: [gaodeMapLayer],
      view: new View({
        center: [113.263865,  23.124012],
        projection: 'EPSG:4326',
        zoom: 10
      })
    });
    
    map.on('click',function(evt){
      console.log(evt.coordinate)
    })


  }


  render() {
    return (
      <div className="map-box">
        <div id="map" className="map"></div>
      </div>

    )
  }
}



