import React from "react"

import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { XYZ, Vector as VectorSource } from 'ol/source'

import { Style, Fill, Stroke } from 'ol/style'

import Feature from 'ol/Feature'
import Circle from 'ol/geom/Circle'

import { transform } from 'ol/proj'

import './style.scss'

export default class Test extends React.Component {


  constructor() {
    super();
    this.state = {
      center: transform([113.263865, 23.124012], 'EPSG:4326', 'EPSG:3857'),
      size: 40,
      vector: null
    }
  }

  componentDidMount() {


    const gaodeMapLayer = new TileLayer({
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
      })
    });

 


    const map = new Map({
      target: 'map',
      layers: [gaodeMapLayer],
      view: new View({
        center: this.state.center,
        zoom: 10
      })
    });

    let source = new VectorSource({ wrapX: false })
    const style = new Style({ fill: new Fill({ color: 'rgba(255, 255, 255, 0.5)' }), stroke: new Stroke({ color: '#0044CC', width: 1 }) })
    let vector = new VectorLayer({
      source: source,
      style
    })

    this.setState({
      vector:vector
    })

    map.addLayer(vector)

    map.on('click', evt => {
      this.setCircle(evt.coordinate)
    })

  }

  setCircle(points) {

    this.state.vector.getSource().clear()
    const _points = points
    var pointCircle = new Circle(_points, 10000)
    var pointFeature = new Feature(pointCircle)
    this.state.vector.getSource().addFeature(pointFeature)

  }


  render() {
    return (
      <div className="map-box">
        <div id="map" className="map"></div>
      </div>

    )
  }
}



